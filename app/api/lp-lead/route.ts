import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { verifyRecaptcha } from '@/lib/verify-recaptcha';

interface LeadFormBody {
  name: string;
  phone: string;
  email: string;
  zipCode?: string;
  address?: string;
  message?: string;
  service: string;
  leadSource: string;
  marketingConsent?: boolean;
  recaptchaToken?: string;
  // Campaign params
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  // Ad-platform click IDs
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  msclkid?: string;
  liFatId?: string;
  ttclid?: string;
  // First-touch context
  landingPage?: string;
  referrer?: string;
  firstTouchTs?: string;
  _hp?: string; // honeypot — must be empty
}

// ── Rate Limiting ──────────────────────────────────────────
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 1000);
}

function splitEmails(envValue: string | undefined): string[] {
  if (!envValue) return [];
  return envValue
    .split(',')
    .map((e) => e.trim())
    .filter((e) => e.length > 0);
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: LeadFormBody = await request.json();

    // Honeypot — silently accept to not tip off the bot.
    if (body._hp) {
      return NextResponse.json({ success: true });
    }

    const { name, phone, email, address, zipCode, message, service, leadSource } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (body.marketingConsent !== true) {
      return NextResponse.json(
        { error: 'Marketing consent is required' },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptcha(body.recaptchaToken, ip);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: recaptchaResult.error || 'CAPTCHA verification failed' },
        { status: 403 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP_USER or SMTP_PASS is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const cleanName = sanitize(name);
    const cleanPhone = sanitize(phone);
    const cleanEmail = sanitize(email);
    const cleanAddress = address ? sanitize(address) : '';
    const cleanZip = zipCode ? sanitize(zipCode) : '';
    const cleanMessage = message ? sanitize(message) : '';
    const cleanService = sanitize(service);
    const cleanLeadSource = sanitize(leadSource);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ── Attribution block — bottom of the email ───────────────
    // Contains everything the in-house team doesn't need to dispatch the
    // job but ASP needs for lead-source reporting and ad-platform ROI.
    const field = (label: string, value?: string) =>
      value && value.trim()
        ? `${label.padEnd(14)}${sanitize(value)}\n`
        : '';

    const attributionBlock = [
      field('Source:',       body.utmSource),
      field('Medium:',       body.utmMedium),
      field('Campaign:',     body.utmCampaign),
      field('Term:',         body.utmTerm),
      field('Content:',      body.utmContent),
      field('gclid:',        body.gclid),
      field('gbraid:',       body.gbraid),
      field('wbraid:',       body.wbraid),
      field('fbclid:',       body.fbclid),
      field('msclkid:',      body.msclkid),
      field('li_fat_id:',    body.liFatId),
      field('ttclid:',       body.ttclid),
      field('Landing Page:', body.landingPage),
      field('Referrer:',     body.referrer),
      field('First Touch:',  body.firstTouchTs),
    ].join('');

    const attributionSection = attributionBlock
      ? `\n── Attribution ────────────────────────────\n${attributionBlock}`
      : '';

    const consentSection = `
── Marketing Consent ──────────────────────
Consent:    YES (email + SMS marketing)
Submitted:  ${new Date().toISOString()}
IP Address: ${ip}
`;

    // Email body: critical info first (what the in-house team needs to
    // dispatch the job), secondary info next, attribution at the bottom.
    const emailBody = `New lead from the Viking HVAC landing pages!

── Lead Details ───────────────────────────
Name:     ${cleanName}
Phone:    ${cleanPhone}
Address:  ${cleanAddress || '(not provided)'}
Service:  ${cleanService}

── Additional Info ────────────────────────
Email:    ${cleanEmail}
ZIP:      ${cleanZip || '(not provided)'}
${cleanMessage ? `Message:  ${cleanMessage}\n` : ''}${consentSection}${attributionSection}
──────────────────────────────────────────
Landing page: ${cleanLeadSource}
`;

    const toEmails = splitEmails(process.env.LP_LEAD_TO);
    const ccEmails = splitEmails(process.env.LP_LEAD_CC);

    // Defaults: Joel as primary (ASP attribution), Viking owners + ops CC'd.
    const toList = toEmails.length
      ? toEmails.join(', ')
      : 'joel.keith@aspbranding.com';
    const ccList = ccEmails.length
      ? ccEmails.join(', ')
      : 'nikki@viking-hvac.com, valerie@viking-hvac.com, info@viking-hvac.com';

    await transporter.sendMail({
      from: `Viking HVAC Leads <${process.env.SMTP_USER}>`,
      to: toList,
      cc: ccList,
      replyTo: cleanEmail,
      subject: `New Lead: ${cleanService} — ${cleanName}${cleanZip ? ` (${cleanZip})` : ''}`,
      text: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('LP Lead API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please call us directly.' },
      { status: 500 }
    );
  }
}

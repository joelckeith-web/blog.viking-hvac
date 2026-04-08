import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ApplicationData {
  name: string;
  phone: string;
  email: string;
  position: string;
  experience: string;
  epaCertified: string;
  driversLicense: string;
  message: string;
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

// ── Input Sanitization ─────────────────────────────────────
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 1000);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
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

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP_USER or SMTP_PASS is not set');
      return NextResponse.json(
        { error: 'Application system is temporarily unavailable. Please call us directly.' },
        { status: 500 }
      );
    }

    const data: ApplicationData = await request.json();

    // Validate required fields
    const required = ['name', 'phone', 'email', 'position', 'experience', 'epaCertified', 'driversLicense'] as const;
    for (const field of required) {
      if (!data[field]?.trim()) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const clean = {
      name: sanitize(data.name),
      phone: sanitize(data.phone),
      email: sanitize(data.email),
      position: sanitize(data.position),
      experience: sanitize(data.experience),
      epaCertified: sanitize(data.epaCertified),
      driversLicense: sanitize(data.driversLicense),
      message: data.message ? sanitize(data.message) : '',
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipients = (process.env.CAREERS_EMAIL_TO || 'joel.keith@aspbranding.com')
      .split(',')
      .map((e) => e.trim())
      .join(', ');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #004281; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Job Application</h1>
        </div>
        <div style="padding: 24px; background-color: #f9fafb;">
          <h2 style="color: #004281; margin-top: 0;">Applicant Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb; width: 40%;">Name</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${clean.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Phone</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">
                <a href="tel:${clean.phone}" style="color: #004281;">${clean.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Email</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${clean.email}" style="color: #004281;">${clean.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Position</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${clean.position}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Experience</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${clean.experience}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">EPA Certified</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${clean.epaCertified}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Driver's License</td>
              <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${clean.driversLicense}</td>
            </tr>
            ${clean.message ? `
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; color: #111827;">${clean.message.replace(/\n/g, '<br>')}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        <div style="padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
          Submitted via blog.viking-hvac.com/careers
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `Viking HVAC Careers <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: clean.email,
      subject: `New Application — ${clean.position} — ${clean.name}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Career application error:', err);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

export async function POST(request: Request) {
  try {
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

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CAREERS_EMAIL_TO;
    if (!apiKey || !recipientEmail) {
      console.error('RESEND_API_KEY or CAREERS_EMAIL_TO environment variable is not set');
      return NextResponse.json(
        { error: 'Application system is temporarily unavailable. Please call us directly.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const recipients = recipientEmail.split(',').map((e) => e.trim());

    await resend.emails.send({
      from: 'Viking HVAC Careers <info@aspbranding.com>',
      to: recipients,
      replyTo: data.email,
      subject: `New Application — ${data.position} — ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #004281; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Job Application</h1>
          </div>
          <div style="padding: 24px; background-color: #f9fafb;">
            <h2 style="color: #004281; margin-top: 0;">Applicant Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb; width: 40%;">Name</td>
                <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Phone</td>
                <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">
                  <a href="tel:${escapeHtml(data.phone)}" style="color: #004281;">${escapeHtml(data.phone)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Email</td>
                <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color: #004281;">${escapeHtml(data.email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Position</td>
                <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.position)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Experience</td>
                <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.experience)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">EPA Certified</td>
                <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.epaCertified)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #e5e7eb;">Driver's License</td>
                <td style="padding: 8px 12px; color: #111827; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.driversLicense)}</td>
              </tr>
              ${data.message ? `
              <tr>
                <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
                <td style="padding: 8px 12px; color: #111827;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          <div style="padding: 16px; text-align: center; color: #6b7280; font-size: 12px;">
            Submitted via blog.viking-hvac.com/careers
          </div>
        </div>
      `,
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

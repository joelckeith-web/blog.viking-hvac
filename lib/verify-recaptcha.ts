interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  score?: number;
  action?: string;
}

export interface VerifyResult {
  success: boolean;
  error?: string;
}

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

/**
 * Server-side Google reCAPTCHA v2 token verification.
 *
 * In development, if RECAPTCHA_SECRET_KEY is unset the check is skipped so
 * local form testing works. In production it fails closed.
 */
export async function verifyRecaptcha(
  token: string | undefined | null,
  remoteIp?: string | null
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('RECAPTCHA_SECRET_KEY is not set');
      return { success: false, error: 'CAPTCHA not configured' };
    }
    console.warn(
      'RECAPTCHA_SECRET_KEY not set — skipping verification in development'
    );
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'Missing CAPTCHA token' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);
    if (remoteIp) formData.append('remoteip', remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const data: RecaptchaVerifyResponse = await res.json();

    if (!data.success) {
      return {
        success: false,
        error: `CAPTCHA verification failed: ${data['error-codes']?.join(', ') || 'unknown'}`,
      };
    }

    return { success: true };
  } catch (err) {
    console.error('reCAPTCHA verify error:', err);
    return { success: false, error: 'CAPTCHA verification request failed' };
  }
}

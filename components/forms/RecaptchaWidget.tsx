'use client';

import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

interface RecaptchaWidgetProps {
  theme?: 'light' | 'dark';
  onVerify: (token: string) => void;
  onError: () => void;
}

/**
 * Google reCAPTCHA v2 Checkbox ("I'm not a robot") widget.
 *
 * Requires NEXT_PUBLIC_RECAPTCHA_SITE_KEY. If missing, renders a dev-mode
 * placeholder so the form can still be tested locally.
 */
export function RecaptchaWidget({
  theme = 'light',
  onVerify,
  onError,
}: RecaptchaWidgetProps) {
  const ref = useRef<ReCAPTCHA>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return (
      <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-900">
        <strong>Dev mode:</strong> NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not
        configured. CAPTCHA is bypassed for local testing.
        <button
          type="button"
          onClick={() => onVerify('dev-mode-bypass')}
          className="ml-2 underline"
        >
          Simulate verify
        </button>
      </div>
    );
  }

  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={siteKey}
      theme={theme}
      onChange={(token) => {
        if (token) {
          onVerify(token);
        } else {
          onError();
        }
      }}
      onErrored={onError}
      onExpired={() => {
        onError();
        ref.current?.reset();
      }}
    />
  );
}

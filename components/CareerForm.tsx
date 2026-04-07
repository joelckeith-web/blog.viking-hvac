'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const POSITIONS = [
  'Senior HVAC Service Technician',
  'HVAC Install Technician',
  'Sales Representative',
] as const;

const EXPERIENCE_LEVELS = [
  'Less than 1 year',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years',
] as const;

export default function CareerForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      position: (form.elements.namedItem('position') as HTMLSelectElement).value,
      experience: (form.elements.namedItem('experience') as HTMLSelectElement).value,
      epaCertified: (form.elements.namedItem('epaCertified') as HTMLSelectElement).value,
      driversLicense: (form.elements.namedItem('driversLicense') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong. Please try again.');
      }

      router.push('/careers/thank-you');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="John Smith"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder="(480) 555-1234"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@example.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition"
        />
      </div>

      {/* Position */}
      <div>
        <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-1">
          Position <span className="text-red-600">*</span>
        </label>
        <select
          id="position"
          name="position"
          required
          defaultValue=""
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition bg-white"
        >
          <option value="" disabled>Select a position</option>
          {POSITIONS.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>

      {/* Experience */}
      <div>
        <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-1">
          Years of HVAC Experience <span className="text-red-600">*</span>
        </label>
        <select
          id="experience"
          name="experience"
          required
          defaultValue=""
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition bg-white"
        >
          <option value="" disabled>Select experience level</option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* EPA Certification */}
      <div>
        <label htmlFor="epaCertified" className="block text-sm font-semibold text-gray-700 mb-1">
          Do you have EPA Certification? <span className="text-red-600">*</span>
        </label>
        <select
          id="epaCertified"
          name="epaCertified"
          required
          defaultValue=""
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition bg-white"
        >
          <option value="" disabled>Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Driver's License */}
      <div>
        <label htmlFor="driversLicense" className="block text-sm font-semibold text-gray-700 mb-1">
          Do you have a valid driver&apos;s license? <span className="text-red-600">*</span>
        </label>
        <select
          id="driversLicense"
          name="driversLicense"
          required
          defaultValue=""
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition bg-white"
        >
          <option value="" disabled>Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
          Anything else you&apos;d like us to know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell us about your experience, certifications, or why you want to join Viking..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[var(--color-brand-accent)] focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-opacity-30 outline-none transition resize-y"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm font-medium bg-red-50 rounded-lg p-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
}

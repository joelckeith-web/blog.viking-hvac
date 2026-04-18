'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQAccordion({
  faqs,
  title = 'Frequently Asked Questions',
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#002147]">
            {title}
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-1 bg-gradient-to-r from-[#004281] via-[#eb1c23] to-[#004281]" />

          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`border-b border-gray-100 last:border-b-0 transition-colors ${
                  open ? 'border-l-4 border-l-[#eb1c23] bg-red-50/30' : 'border-l-4 border-l-transparent'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between py-5 px-6 text-left hover:bg-gray-50/50 transition-colors"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-[#002147] text-base md:text-lg pr-4">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <svg
                      className={`w-4 h-4 text-[#eb1c23] transition-transform ${open ? 'rotate-45' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open ? 'max-h-[600px] pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-700 leading-relaxed px-6 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

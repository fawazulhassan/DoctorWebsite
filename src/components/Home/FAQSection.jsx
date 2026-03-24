import { useState } from 'react';
import SectionTitle from '../Shared/SectionTitle';
import { ASSET } from '../../utils/asset';

const defaultItems = [
  { q: 'How do I book an appointment?', a: 'You can book online through our website, call our hotline, or visit in person. Our staff will help you find a convenient time.' },
  { q: 'What should I bring to my first visit?', a: 'Please bring a valid ID, insurance card (if applicable), and any previous medical records or test results.' },
  { q: 'Do you offer emergency services?', a: 'Yes. Our emergency department is open 24/7 for urgent care. For life-threatening emergencies, please call 911.' },
];

export default function FAQSection({ items = defaultItems }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Usually Asked" subtitle="Questions & Answers" />
        <div className="mt-6 md:mt-12 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between px-3 py-2 md:px-5 md:py-4 text-left font-medium text-gray-900 hover:bg-gray-50 text-xs md:text-base"
              >
                {item.q}
                <img
                  src={openIndex === i ? ASSET('faq-arrow-up.svg') : ASSET('faq-arrow-down.svg')}
                  alt=""
                  className="w-3 h-3 md:w-4 md:h-4 shrink-0 ml-2"
                />
              </button>
              {openIndex === i && (
                <div className="px-3 py-2 md:px-5 md:py-4 pt-0 text-gray-600 text-xs md:text-sm border-t border-gray-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
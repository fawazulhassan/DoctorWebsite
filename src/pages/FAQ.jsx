import { useState } from 'react';
import SectionTitle from '../components/Shared/SectionTitle';
import { FAQ_CATEGORIES } from '../constants/faq';
import { ASSET } from '../utils/asset';

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (catIndex, itemIndex) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Frequently Asked Questions" subtitle="Organized by category" />

        <div className="mt-12 space-y-8">
          {FAQ_CATEGORIES.map((category, catIndex) => (
            <div key={category.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h2>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => {
                  const key = `${catIndex}-${itemIndex}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={itemIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleItem(catIndex, itemIndex)}
                        className={`w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 ${isOpen ? 'bg-primary/5' : ''}`}
                      >
                        {item.q}
                        <img
                          src={isOpen ? ASSET('faq-arrow-up.svg') : ASSET('faq-arrow-down.svg')}
                          alt=""
                          className="w-4 h-4 shrink-0"
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 py-4 pt-0 text-gray-600 text-sm border-t border-gray-100">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

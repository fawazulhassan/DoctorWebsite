import { useState } from 'react';
import SectionTitle from '../Shared/SectionTitle';
import { ASSET } from '../../utils/asset';

const defaultReviews = [
  { name: 'Ali', quote: 'Family-centered care and cutting-edge treatments made all the difference for us.', avatar: 'review-avatar-1.png' },
  { name: 'Amna', quote: 'The staff was incredibly supportive and professional throughout my recovery.', avatar: 'review-avatar-2.png' },
  { name: 'Laiba', quote: 'From diagnosis to follow-up, I felt heard and well cared for every step.', avatar: 'review-avatar-3.png' },
];

export default function Reviews({ reviews = defaultReviews }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = reviews[selectedIndex];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Some Reviews" subtitle="What Our Patients Say" />
        <div className="mt-10 sm:mt-12 grid grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-start">

          {/* Left — reviewer list */}
          <div className="col-span-2 flex flex-col gap-3 sm:gap-4 md:gap-6">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`flex items-center gap-3 md:gap-4 text-left p-3 md:p-3 rounded-lg transition ${
                  i === selectedIndex ? 'bg-primary/10 ring-1 ring-primary/30' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={ASSET(r.avatar)}
                  alt={r.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 rounded-full object-cover bg-gray-200 shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/56/E6F0FF/333?text=${r.name[0]}`;
                  }}
                />
                <span className="font-medium text-gray-900 text-sm sm:text-base md:text-base leading-snug">{r.name}</span>
              </button>
            ))}
          </div>

          {/* Right — review content */}
          <div className="col-span-3">
            <img
              src={ASSET('review-quote-icon.svg')}
              alt=""
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary/40 mb-3 md:mb-4"
            />
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-base">
              {current.quote}
            </p>
            <div className="flex gap-1.5 sm:gap-2 mt-3 md:mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} src={ASSET('review-star.svg')} alt="" className="w-5 h-5 sm:w-5 sm:h-5 md:w-5 md:h-5" />
              ))}
            </div>
            <p className="mt-2 md:mt-2 font-semibold text-gray-900 text-sm sm:text-base md:text-base">
              {current.name}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
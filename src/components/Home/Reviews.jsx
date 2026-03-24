import { useState } from 'react';
import SectionTitle from '../Shared/SectionTitle';
import { ASSET } from '../../utils/asset';

const defaultReviews = [
  { name: 'Paulo Hubert', quote: 'Family-centered care and cutting-edge treatments made all the difference for us.', avatar: 'review-avatar-1.png' },
  { name: 'Laurence Vendetta', quote: 'The staff was incredibly supportive and professional throughout my recovery.', avatar: 'review-avatar-2.png' },
  { name: 'Cassandra Raul', quote: 'From diagnosis to follow-up, I felt heard and well cared for every step.', avatar: 'review-avatar-3.png' },
];

export default function Reviews({ reviews = defaultReviews }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = reviews[selectedIndex];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Some Reviews" subtitle="What Our Patients Say" />
        <div className="mt-12 grid grid-cols-5 gap-3 md:gap-8 items-start">

          {/* Left — reviewer list */}
          <div className="col-span-2 flex flex-col gap-2 md:gap-6">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`flex items-center gap-1 md:gap-4 text-left p-2 md:p-3 rounded-lg transition ${
                  i === selectedIndex ? 'bg-primary/10 ring-1 ring-primary/30' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={ASSET(r.avatar)}
                  alt={r.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full object-cover bg-gray-200 shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/56/E6F0FF/333?text=${r.name[0]}`;
                  }}
                />
                <span className="font-medium text-gray-900 text-xs sm:text-sm md:text-base">{r.name}</span>
              </button>
            ))}
          </div>

          {/* Right — review content */}
          <div className="col-span-3">
            <img
              src={ASSET('review-quote-icon.svg')}
              alt=""
              className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 text-primary/40 mb-2 md:mb-4"
            />
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              {current.quote}
            </p>
            <div className="flex gap-1 mt-2 md:mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} src={ASSET('review-star.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5" />
              ))}
            </div>
            <p className="mt-1 md:mt-2 font-semibold text-gray-900 text-xs md:text-base">
              {current.name}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
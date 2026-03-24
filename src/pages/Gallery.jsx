import SectionTitle from '../components/Shared/SectionTitle';
import { ASSET } from '../utils/asset';

const galleryItems = [
  { label: 'Clinic Exterior', image: 'hero-img-1.png' },
  { label: 'Waiting Area', image: 'about-group-masked.png' },
  { label: 'Consultation Room', image: 'hero-img-1.png' },
  { label: 'Healthcare Team', image: 'about-group-masked.png' },
  { label: 'Medical Care', image: 'hero-img-1.png' },
  { label: 'Patient Care', image: 'about-group-masked.png' },
];

export default function Gallery() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Gallery" subtitle="Our clinic and facilities" />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <div key={i}>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={ASSET(item.image)}
                  alt={item.label}
                  className="w-full h-full object-cover hover:scale-105 transition"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x225/E6F0FF/333?text=${encodeURIComponent(item.label)}`;
                  }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

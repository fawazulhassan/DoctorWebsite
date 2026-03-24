import SectionTitle from '../Shared/SectionTitle';
import { ASSET } from '../../utils/asset';

export default function PartnersSection() {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Partners" subtitle="Our Collaborators" />
        <div className="mt-6 md:mt-12 flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 grayscale opacity-80">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <img
              key={i}
              src={ASSET(`partner-logo-${i}.svg`)}
              alt={`Partner ${i}`}
              className="h-5 sm:h-7 md:h-10 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
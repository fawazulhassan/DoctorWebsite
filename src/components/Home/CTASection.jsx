import { Link } from 'react-router-dom';
import { ASSET } from '../../utils/asset';

export default function CTASection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#78A9F8] to-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-center">

          {/* Text */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug md:leading-tight">
              Don't Lose Your Health — Take a Checkup!
            </h2>
            <p className="mt-2 md:mt-4 text-white/90 text-xs sm:text-sm md:text-base max-w-lg hidden sm:block">
              Schedule your appointment today and take the first step toward better health. Our team is ready to support you.
            </p>
            <Link
              to="/book-appointment"
              className="mt-4 md:mt-6 inline-flex items-center gap-2 md:gap-2 px-5 py-3 md:px-6 md:py-3 rounded-xl md:rounded-lg bg-white text-primary font-semibold md:font-medium hover:bg-gray-100 text-sm md:text-base"
            >
              Book Now
              <img src={ASSET('button-arrow-right.svg')} alt="" className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={ASSET('cta-doctor-shield.png')}
              alt=""
              className="w-full h-auto object-contain max-w-[180px] sm:max-w-[200px] md:max-w-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x400/fff/3B7DF8?text=Doctor';
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
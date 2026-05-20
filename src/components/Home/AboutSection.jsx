import { Link } from 'react-router-dom';
import { ASSET } from '../../utils/asset';
import { CLINIC } from '../../constants/clinic';

export default function AboutSection() {
  return (
    <section className="py-8 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">

          {/* Image Column */}
          <div className="relative flex justify-center">
            <div className="relative w-full">

              {/* Main image — scales with column, never constrained too small */}
              <img
                src={ASSET('about-group-masked.png')}
                alt="Health & Mind Care Clinic team"
                className="w-full h-auto rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl object-cover shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/500x400/E6F0FF/333?text=Health+%26+Mind+Care+Clinic';
                }}
              />

              {/* Doctor hex badge — always bottom-right, scales with vw */}
              <img
                src={ASSET('about-doctor-hex.png')}
                alt=""
                style={{
                  position: 'absolute',
                  bottom: '-8%',
                  right: '-12%',
                  width: 'clamp(48px, 18vw, 200px)',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e) => (e.target.style.display = 'none')}
              />

              {/* Quality badge — always top-right, scales with vw */}
              <img
                src={ASSET('about-badge-quality.png')}
                alt="FCPS Qualified"
                style={{
                  position: 'absolute',
                  top: '-6%',
                  right: '-10%',
                  width: 'clamp(36px, 12vw, 104px)',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e) => (e.target.style.display = 'none')}
              />

            </div>
          </div>

          {/* Text Column */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              About Us
            </h2>

            <p className="text-primary font-medium mt-1 sm:mt-2 text-base sm:text-lg md:text-xl">
              We make a difference
            </p>

            <div className="mt-2 sm:mt-3 md:mt-4 flex gap-2">
              <img
                src={ASSET('about-arrow-right.svg')}
                alt=""
                className="w-5 h-5 sm:w-5 sm:h-5 shrink-0 mt-0.5"
              />
              <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                {CLINIC.name} is dedicated to providing accessible mental health and pediatric care for Lahore and Kasur communities.
              </p>
            </div>

            <div className="hidden sm:block">
              <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
                Our mission is to make quality healthcare accessible and compassionate. With our dual-location model, we serve patients in Lahore (Harbanspura) and Kasur (Daulat Nagar) through clinic visits, online video consultation, and home visits.
              </p>

              <p className="mt-2 md:mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
                We believe in treating the whole person—mind, body, and spirit—and in building lasting relationships with our patients and their families.
              </p>
            </div>

            <Link
              to="/about"
              className="mt-3 sm:mt-4 md:mt-6 inline-flex items-center gap-2 rounded-lg bg-primary text-white text-base sm:text-lg font-medium hover:bg-primary-hover px-5 py-2.5 sm:px-6 sm:py-3"
            >
              Learn More
              <img
                src={ASSET('button-arrow-right.svg')}
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
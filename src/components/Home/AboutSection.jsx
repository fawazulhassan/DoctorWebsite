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
                  bottom: '-4%',
                  right: '-8%',
                  width: 'clamp(28px, 12vw, 176px)',
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
                  top: '-4%',
                  right: '-6%',
                  width: 'clamp(20px, 8vw, 96px)',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e) => (e.target.style.display = 'none')}
              />

            </div>
          </div>

          {/* Text Column */}
          <div>
            <h2 className="font-bold text-gray-900"
              style={{ fontSize: 'clamp(11px, 2.2vw, 30px)', lineHeight: 1.25 }}>
              About Us
            </h2>

            <p className="text-primary font-medium mt-1"
              style={{ fontSize: 'clamp(8px, 1.2vw, 16px)' }}>
              We make a difference
            </p>

            <div className="mt-1 md:mt-4 flex gap-1 md:gap-2">
              <img
                src={ASSET('about-arrow-right.svg')}
                alt=""
                style={{ width: 'clamp(8px, 1.3vw, 20px)', height: 'clamp(8px, 1.3vw, 20px)' }}
                className="shrink-0 mt-0.5"
              />
              <p className="text-gray-700 font-medium"
                style={{ fontSize: 'clamp(7px, 1.05vw, 14px)', lineHeight: 1.5 }}>
                {CLINIC.name} is dedicated to providing accessible mental health and pediatric care for Lahore and Kasur communities.
              </p>
            </div>

            <p className="mt-1 md:mt-4 text-gray-600 leading-relaxed"
              style={{ fontSize: 'clamp(6px, 0.95vw, 14px)', lineHeight: 1.6 }}>
              Our mission is to make quality healthcare accessible and compassionate. With our dual-location model, we serve patients in Lahore (Harbanspura) and Kasur (Daulat Nagar) through clinic visits, online video consultation, and home visits.
            </p>

            <p className="mt-1 md:mt-3 text-gray-600 leading-relaxed"
              style={{ fontSize: 'clamp(6px, 0.95vw, 14px)', lineHeight: 1.6 }}>
              We believe in treating the whole person—mind, body, and spirit—and in building lasting relationships with our patients and their families.
            </p>

            <Link
              to="/about"
              className="mt-2 md:mt-6 inline-flex items-center gap-1 md:gap-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover"
              style={{
                padding: 'clamp(4px, 0.65vw, 12px) clamp(8px, 1.3vw, 24px)',
                fontSize: 'clamp(7px, 1.05vw, 16px)',
              }}
            >
              Learn More
              <img
                src={ASSET('button-arrow-right.svg')}
                alt=""
                style={{ width: 'clamp(8px, 1.3vw, 20px)', height: 'clamp(8px, 1.3vw, 20px)' }}
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
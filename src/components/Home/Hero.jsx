import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSET } from '../../utils/asset';
import { CLINIC } from '../../constants/clinic';
import LocationSelector from '../Shared/LocationSelector';

export default function Hero() {
  const [location, setLocation] = useState('lahore');
  const locationAddress = location === 'lahore' ? CLINIC.lahore.address : CLINIC.kasur.address;
  const locationLabelMobile = location === 'lahore' ? CLINIC.lahore.label : CLINIC.kasur.label;

  return (
    <div className="relative">

      <section className="home-hero relative bg-gradient-to-br from-[#EBF2FF] via-[#E6F0FF] to-[#B0D2FF] overflow-hidden py-16 md:py-24 pb-24">
        <img
          src={ASSET('hero-bg-waves.svg')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
          aria-hidden
        />

        {/* Hero image — same position on all breakpoints; mobile uses hero-img-mobile.png */}
        <div className="absolute bottom-0 right-0 h-full w-[70%] sm:w-1/2">
          <div className="relative h-full flex items-end justify-center">
          <img
  src={ASSET('hero-img-mobile.png')}
  alt="Dr. Rizwan Shafiq and Dr. Faiza Malik Jabeen"
  className="w-full h-full object-contain object-bottom sm:hidden scale-[0.9] origin-bottom translate-x-8"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/600x400/E6F0FF/3B7DF8?text=Health+%26+Mind+Care+Clinic';
  }}
/>
            <img
              src={ASSET('hero-img-1.png')}
              alt="Dr. Rizwan Shafiq and Dr. Faiza Malik Jabeen"
              className="w-full h-full object-contain object-bottom hidden sm:block"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/E6F0FF/3B7DF8?text=Health+%26+Mind+Care+Clinic';
              }}
            />

          </div>
        </div>

        {/* Text content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="w-full sm:w-1/2 pr-0 sm:pr-2 lg:pr-4">
            <h1 className="home-hero__title -mt-6 sm:mt-0 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Mental Health & Pediatric Care Clinic
            </h1>
            <p className="home-hero__subtitle hidden sm:block mt-2 md:mt-4 text-xs sm:text-sm md:text-lg text-gray-600 max-w-lg">
              Accessible, compassionate care from FCPS-qualified specialists. Dr. Rizwan Shafiq (Psychiatry) and Dr. Faiza Malik Jabeen (Paediatrics) serve you through clinic visits, online consultation, and home visits.
            </p>
            <div className="mt-3 md:mt-6">
              <p className="text-xs md:text-sm text-gray-600 mb-2">Choose your location:</p>
              <LocationSelector value={location} onChange={setLocation} />
            </div>
            <div className="mt-3 md:mt-6 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:gap-2 md:gap-3">
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Link to="/book-appointment" className="px-3 py-2 md:px-6 md:py-3 rounded-lg bg-[#307BC4] text-white font-medium hover:opacity-90 text-xs md:text-base">
                  Book Appointment
                </Link>
                <Link to="/online-consultation" className="px-3 py-2 md:px-6 md:py-3 rounded-lg bg-white text-primary border border-primary font-medium hover:bg-[#307BC4]/5 text-xs md:text-base inline-flex">
                  Online Consultation
                </Link>
                {location === 'lahore' && (
                  <Link to="/home-visit" className="hidden sm:inline-flex px-3 py-2 md:px-6 md:py-3 rounded-lg bg-white text-primary border border-primary font-medium hover:bg-[#307BC4]/5 text-xs md:text-base">
                    Home Visit
                  </Link>
                )}
              </div>
              {location === 'lahore' && (
                <Link to="/home-visit" className="sm:hidden inline-flex px-3 py-2 rounded-lg bg-white text-primary border border-primary font-medium hover:bg-[#307BC4]/5 text-xs">
                  Home Visit
                </Link>
              )}
            </div>
            <Link to="/about" className="hidden sm:inline-block mt-3 md:mt-6 px-3 py-2 md:px-6 md:py-3 rounded-lg bg-[#307BC4] text-white font-medium hover:opacity-90 text-xs md:text-base">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Contact bar */}
      <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-14 left-0 right-0 z-20 px-2 sm:px-4 md:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-nowrap items-center justify-between gap-1.5 sm:flex-wrap sm:gap-2 md:gap-4 bg-white rounded-xl md:rounded-2xl shadow-xl p-2.5 sm:p-3 md:p-6 lg:p-10">

            {/* Hotline */}
            <div className="sm:order-1 flex items-center gap-1.5 sm:gap-2 md:gap-4 shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-[#307BC4] flex items-center justify-center shrink-0">
                <img src={ASSET('contact-phone.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5 invert" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm leading-tight">Hotline</p>
                <a href={`tel:${CLINIC.phone}`} className="text-[10px] sm:text-xs md:text-sm text-gray-500 hover:text-primary whitespace-nowrap">{CLINIC.phone}</a>
              </div>
            </div>

            <div className="hidden sm:order-2 sm:block w-px h-8 md:h-10 bg-gray-200 shrink-0" />

            {/* Location — between hotline and button on mobile (one row) */}
            <div className="order-2 sm:order-5 flex items-center gap-1.5 sm:gap-2 md:gap-4 min-w-0 flex-1 sm:flex-initial px-0.5 sm:px-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full bg-[#307BC4] flex items-center justify-center shrink-0">
                <img src={ASSET('contact-location.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5 invert" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm leading-tight">Location</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate sm:whitespace-normal">
                  <span className="sm:hidden">{locationLabelMobile}</span>
                  <span className="hidden sm:inline">{locationAddress}</span>
                </p>
              </div>
            </div>

            {/* Phone — hidden on mobile (same number as hotline) */}
            <div className="hidden sm:order-3 sm:flex items-center gap-2 md:gap-4 min-w-0 shrink-0">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#307BC4] flex items-center justify-center shrink-0">
                <img src={ASSET('contact-ambulance.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5 invert" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-xs md:text-sm">Phone</p>
                <a href={`tel:${CLINIC.phone}`} className="text-xs md:text-sm text-gray-500 hover:text-primary whitespace-nowrap">{CLINIC.phone}</a>
              </div>
            </div>

            <div className="hidden sm:order-4 sm:block w-px h-8 md:h-10 bg-gray-200 shrink-0" />

            {/* Book Now */}
            <Link to="/book-appointment" className="order-3 sm:order-6 flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-3 rounded-lg bg-[#307BC4] text-white font-medium hover:opacity-90 whitespace-nowrap text-[10px] sm:text-xs md:text-base shrink-0">
              Book Now
              <img src={ASSET('button-arrow-right.svg')} alt="" className="w-3 h-3 md:w-4 md:h-4" />
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
}
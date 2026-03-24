import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSET } from '../../utils/asset';
import { CLINIC } from '../../constants/clinic';
import LocationSelector from '../Shared/LocationSelector';

export default function Hero() {
  const [location, setLocation] = useState('lahore');

  return (
    <div className="relative">

      <section className="home-hero relative bg-gradient-to-br from-[#EBF2FF] via-[#E6F0FF] to-[#B0D2FF] overflow-hidden py-16 md:py-24 pb-24">
        <img
          src={ASSET('hero-bg-waves.svg')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
          aria-hidden
        />

        {/* Hero image — hidden on mobile, visible sm+ */}
        <div className="absolute bottom-0 right-0 h-full w-1/2 hidden sm:block">
          <div className="relative h-full flex items-end justify-center">
            <img
              src={ASSET('hero-img-1.png')}
              alt="Dr. Rizwan Shafiq and Dr. Faiza Malik Jabeen"
              className="w-full h-full object-contain object-bottom"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/E6F0FF/3B7DF8?text=Health+%26+Mind+Care+Clinic';
              }}
            />

            {/* Floating badge — bottom left — 50K+ Patients */}
            <div className="absolute bottom-20 sm:bottom-28 md:bottom-32 left-0 bg-white rounded-full shadow-lg px-2 py-1 sm:px-4 sm:py-2 flex items-center gap-1 sm:gap-3 z-10">
              <div className="flex -space-x-1 sm:-space-x-2">
                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#307BC4]/40 border-2 border-white" />
                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#307BC4]/60 border-2 border-white" />
                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#307BC4]/80 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">50K+</p>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#307BC4] flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 hidden sm:block">Patient Recover</p>
              </div>
            </div>

          </div>
        </div>

        {/* Text content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="w-full sm:w-1/2 pr-0 sm:pr-2 lg:pr-4">
            <h1 className="home-hero__title text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Mental Health & Pediatric Care Clinic
            </h1>
            <p className="home-hero__subtitle mt-2 md:mt-4 text-xs sm:text-sm md:text-lg text-gray-600 max-w-lg">
              Accessible, compassionate care from FCPS-qualified specialists. Dr. Rizwan Shafiq (Psychiatry) and Dr. Faiza Malik Jabeen (Paediatrics) serve you through clinic visits, online consultation, and home visits.
            </p>
            <div className="mt-3 md:mt-6">
              <p className="text-xs md:text-sm text-gray-600 mb-2">Choose your location:</p>
              <LocationSelector value={location} onChange={setLocation} />
            </div>
            <div className="mt-3 md:mt-6 flex flex-wrap gap-2 md:gap-3">
              <Link to="/book-appointment" className="px-3 py-2 md:px-6 md:py-3 rounded-lg bg-[#307BC4] text-white font-medium hover:opacity-90 text-xs md:text-base">
                Book Appointment
              </Link>
              <Link to="/online-consultation" className="px-3 py-2 md:px-6 md:py-3 rounded-lg bg-white text-primary border border-primary font-medium hover:bg-[#307BC4]/5 text-xs md:text-base inline-flex">
                Online Consultation
              </Link>
              {location === 'lahore' && (
                <Link to="/home-visit" className="px-3 py-2 md:px-6 md:py-3 rounded-lg bg-white text-primary border border-primary font-medium hover:bg-[#307BC4]/5 text-xs md:text-base inline-flex">
                  Home Visit
                </Link>
              )}
            </div>
            <Link to="/about" className="mt-3 md:mt-6 inline-block px-3 py-2 md:px-6 md:py-3 rounded-lg bg-[#307BC4] text-white font-medium hover:opacity-90 text-xs md:text-base">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Contact bar */}
      <div className="absolute -bottom-10 left-0 right-0 z-20 px-2 sm:px-4 md:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4 bg-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-6 lg:p-10">

            {/* Hotline */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#307BC4] flex items-center justify-center shrink-0">
                <img src={ASSET('contact-phone.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5 invert" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs md:text-sm">Hotline</p>
                <a href={`tel:${CLINIC.phone}`} className="text-xs md:text-sm text-gray-500 hover:text-primary">{CLINIC.phone}</a>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 md:h-10 bg-gray-200" />

            {/* Emergency */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#307BC4] flex items-center justify-center shrink-0">
                <img src={ASSET('contact-ambulance.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5 invert" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs md:text-sm">Phone</p>
                <a href={`tel:${CLINIC.phone}`} className="text-xs md:text-sm text-gray-500 hover:text-primary">{CLINIC.phone}</a>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 md:h-10 bg-gray-200" />

            {/* Location */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#307BC4] flex items-center justify-center shrink-0">
                <img src={ASSET('contact-location.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5 invert" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs md:text-sm">Location</p>
                <p className="text-xs md:text-sm text-gray-500">
                  {location === 'lahore' ? CLINIC.lahore.address : CLINIC.kasur.address}
                </p>
              </div>
            </div>

            {/* Book Now */}
            <Link to="/book-appointment" className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-6 md:py-3 rounded-lg bg-[#307BC4] text-white font-medium hover:opacity-90 whitespace-nowrap text-xs md:text-base">
              Book Now
              <img src={ASSET('button-arrow-right.svg')} alt="" className="w-3 h-3 md:w-4 md:h-4" />
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC, TEL_URL } from '../constants/clinic';
import { ASSET } from '../utils/asset';
import BookingForm from '../components/Shared/BookingForm';
import { supabase } from '../lib/supabase';
import { DAYS, formatTime12h } from '../utils/slots';

const DR_FAIZA_DEGREES = ['M.B.B.S', 'F.C.P.S (Paediatrics)'];
const DR_FAIZA_EXPERIENCE = [
  'Paediatrics specialist with focus on child health and development',
  'General checkups, vaccination, and growth monitoring',
  'Experience in digestive, respiratory, and nutrition counseling',
];
const DR_FAIZA_AWARDS = ['Board certified in Paediatrics', 'F.C.P.S (Paediatrics)'];
const SCHEDULE_LINES_FALLBACK = [
  { day: 'Monday',    time: '09:00 - 15:00' },
  { day: 'Wednesday', time: '10:00 - 16:00' },
  { day: 'Friday',    time: '08:00 - 13:00' },
];

const DEGREE_ICON = (
  <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);
const BRIEFCASE_ICON = (
  <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const MEDAL_ICON = (
  <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function DoctorFaiza() {
  const [scheduleLines, setScheduleLines] = useState(SCHEDULE_LINES_FALLBACK);

  useEffect(() => {
    let isMounted = true;

    async function fetchDoctorSchedule() {
      const { data, error } = await supabase
        .from('doctor_slots')
        .select('day_of_week, start_time, end_time, is_active')
        .eq('doctor_slug', 'faiza-malik');

      if (error || !data?.length) {
        if (isMounted) setScheduleLines(SCHEDULE_LINES_FALLBACK);
        return;
      }

      const activeLines = data
        .filter((slot) => slot.is_active)
        .sort((a, b) => a.day_of_week - b.day_of_week)
        .map((slot) => {
          const day = DAYS.find((d) => d.value === slot.day_of_week)?.label || 'Day';
          const start = formatTime12h(slot.start_time.slice(0, 5));
          const end = formatTime12h(slot.end_time.slice(0, 5));
          return { day, time: `${start} - ${end}` };
        });

      if (isMounted) {
        setScheduleLines(activeLines.length ? activeLines : SCHEDULE_LINES_FALLBACK);
      }
    }

    fetchDoctorSchedule();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* SECTION-02 — Doctor Profile */}
      <style>{`
        .blue-box-overlap-faiza {
          margin-left: -100%;
          padding-left: calc(100% + 0.5rem);
          padding-right: 0.5rem;
          padding-top: calc(2rem + 0.5rem);
          padding-bottom: 2rem;
          margin-right: -0.5rem;
          margin-top: -2rem;
          border-radius: 0.5rem;
        }
        @media (min-width: 480px) {
          .blue-box-overlap-faiza {
            margin-left: -110%;
            padding-left: calc(110% + 0.75rem);
            padding-right: 0.75rem;
            padding-top: calc(3rem + 0.75rem);
            padding-bottom: 3rem;
            margin-right: -0.75rem;
            margin-top: -3rem;
            border-radius: 0.75rem;
          }
        }
        @media (min-width: 640px) {
          .blue-box-overlap-faiza {
            margin-left: -120%;
            padding-left: calc(120% + 1rem);
            padding-right: 1rem;
            padding-top: calc(4rem + 1rem);
            padding-bottom: 4rem;
            margin-right: -2rem;
            margin-top: -4rem;
            border-radius: 0.75rem;
          }
        }
        @media (min-width: 768px) {
          .blue-box-overlap-faiza {
            margin-left: -140%;
            padding-left: calc(140% + 1.5rem);
            padding-right: 1.5rem;
            padding-top: calc(6rem + 1.5rem);
            padding-bottom: 6rem;
            margin-right: -10rem;
            margin-top: -6rem;
            border-radius: 1rem;
          }
        }
        .doctor-social-icons {
          transform: translateY(155%);
        }
        @media (min-width: 768px) {
          .doctor-social-icons {
            transform: translateY(220%);
          }
        }
        @media (min-width: 1024px) {
          .doctor-social-icons {
            transform: translateY(190%);
          }
        }
      `}</style>

      <section className="py-6 md:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-12 relative items-start">

            {/* LEFT — Doctor Card */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden relative z-10">

              {/* Doctor Image */}
              <div className="w-full bg-white">
                <img
                  src={ASSET('doctor-image.png')}
                  alt="Dr. Fazila Jabeen - Pediatrician"
                  className="w-full object-contain object-center h-36 xs:h-44 sm:h-52 md:h-72 lg:h-[420px]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/550x600/E6F0F8/333?text=Dr.+Fazila+Jabeen';
                  }}
                />
              </div>

              {/* Blue Department Bar */}
              <div className="bg-[#307BC4] px-2 py-2 xs:py-2.5 sm:px-4 sm:py-2 md:px-6 md:py-4 rounded-b-xl md:rounded-b-2xl">
                <p className="text-white font-semibold text-center text-sm xs:text-base sm:text-sm md:text-base">
                  Paediatrics Department
                </p>
              </div>

              {/* Contact + Schedule */}
              <div className="p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8">

                {/* Contact Info */}
                <div>
                  <h3 className="font-bold text-primary mb-1.5 sm:mb-2 md:mb-3 flex items-center gap-1 md:gap-2 text-xs xs:text-sm sm:text-sm md:text-base lg:text-xl">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <img src={ASSET('contact-info-1.png')} alt="" className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    </div>
                    Contact Info
                  </h3>
                  <div className="space-y-1 md:space-y-2 pl-1">
                    <a href={TEL_URL} className="flex items-center gap-1 text-gray-500 hover:text-primary text-xs xs:text-sm sm:text-xs md:text-sm lg:text-lg">
                      <img src={ASSET('footer-icon-phone.svg')} alt="" className="w-4 h-4 xs:w-4 xs:h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 shrink-0" />
                      <span className="truncate">{CLINIC.phone}</span>
                    </a>
                    <a href={`mailto:${CLINIC.email}`} className="flex items-center gap-1 text-gray-500 hover:text-primary text-xs xs:text-sm sm:text-xs md:text-sm lg:text-lg">
                      <img src={ASSET('footer-icon-email.svg')} alt="" className="w-4 h-4 xs:w-4 xs:h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 shrink-0" />
                      <span className="truncate">{CLINIC.email}</span>
                    </a>
                  </div>
                </div>

                {/* Appointment Schedules */}
                <div>
                  <h3 className="font-bold text-primary mb-1.5 sm:mb-2 md:mb-3 flex items-center gap-1 md:gap-2 text-xs xs:text-sm sm:text-sm md:text-base lg:text-xl">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <img src={ASSET('appointment-icon-calendar.svg')} alt="" className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    </div>
                    Schedules
                  </h3>
                  <div className="bg-white border border-blue-100 rounded-lg md:rounded-2xl px-1.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 shadow-sm">
                    {scheduleLines.map((s) => (
                      <div key={s.day} className="flex items-center justify-between py-1 sm:py-1.5 md:py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-700 text-[10px] xs:text-xs sm:text-xs md:text-sm lg:text-lg font-medium">{s.day}</span>
                        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 text-primary text-[10px] xs:text-xs sm:text-xs md:text-sm lg:text-lg font-semibold">
                          <ClockIcon />
                          <span>{s.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT — Doctor Info */}
            <div className="py-0 md:py-10">

              {/* Blue info banner — overlaps left card at all sizes */}
              <div className="blue-box-overlap-faiza relative bg-[#E6F0F8]">
                <img
                  src={ASSET('doctor-background-banner.png')}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <h1 className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold text-[#274760] leading-tight">
                      Dr. Fazila Jabeen
                    </h1>
                    <p className="text-[#274760] font-semibold mt-0.5 text-xs xs:text-sm sm:text-xs md:text-sm lg:text-xl">
                      M.B.B.S, F.C.P.S (Paediatrics)
                    </p>
                    <p className="mt-0.5 md:mt-2 text-gray-600 text-xs xs:text-sm sm:text-xs md:text-sm lg:text-2xl">
                      Board certified Paediatrician
                    </p>
                    <p className="mt-0.5 md:mt-4 text-gray-600 text-xs xs:text-sm sm:text-xs md:text-sm lg:text-2xl leading-relaxed">
                      Specialization: Child Health & Development. General checkups, vaccination, digestive issues,
                      respiratory problems, growth monitoring, and more.
                    </p>
                  </div>

                  {/* Social icons — bottom-right of blue box */}
                  <div className="doctor-social-icons absolute bottom-0 right-0 pr-2 sm:pr-3 md:pr-4">
                    <div className="inline-flex items-center gap-1.5 xs:gap-2 sm:gap-1.5 md:gap-3 lg:gap-4 bg-[#307BC4] px-2.5 xs:px-3 sm:px-3 md:px-4 lg:px-5 py-2 xs:py-2.5 sm:py-2 md:py-3 lg:py-3.5 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md">
                      <a href="#" aria-label="Facebook" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
                        <img src={ASSET('footer-social-facebook.svg')} alt="" className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </a>
                      <a href="#" aria-label="LinkedIn" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center">
                        <img src={ASSET('footer-social-linkedin.svg')} alt="" className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Degrees */}
              <div className="mt-2 sm:mt-3 md:mt-8">
                <h3 className="font-bold text-[#274760] mb-1 md:mb-2 flex items-center gap-1 md:gap-2 text-xs xs:text-sm sm:text-sm md:text-base lg:text-xl">
                  {DEGREE_ICON} Degrees
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-0.5 md:space-y-1 text-xs xs:text-sm sm:text-xs md:text-sm lg:text-lg">
                  {DR_FAIZA_DEGREES.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              {/* Experience */}
              <div className="mt-2 sm:mt-3 md:mt-6">
                <h3 className="font-bold text-gray-900 mb-1 md:mb-2 flex items-center gap-1 md:gap-2 text-xs xs:text-sm sm:text-sm md:text-base lg:text-xl">
                  {BRIEFCASE_ICON} Experience
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-0.5 md:space-y-1 text-xs xs:text-sm sm:text-xs md:text-sm lg:text-lg">
                  {DR_FAIZA_EXPERIENCE.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              {/* Awards */}
              <div className="mt-2 sm:mt-3 md:mt-6">
                <h3 className="font-bold text-gray-900 mb-1 md:mb-2 flex items-center gap-1 md:gap-2 text-xs xs:text-sm sm:text-sm md:text-base lg:text-xl">
                  {MEDAL_ICON} Award & Achievements
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-0.5 md:space-y-1 text-xs xs:text-sm sm:text-xs md:text-sm lg:text-lg">
                  {DR_FAIZA_AWARDS.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services tabs */}
      <div className="bg-white pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-2 sm:gap-3">
            <Link to="/book-appointment" className="w-full text-center px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg bg-[#307BC4] text-white font-semibold hover:opacity-90 text-[10px] xs:text-xs sm:text-sm md:text-base">
              Book Appointment
            </Link>
            <Link to="/online-consultation" className="w-full text-center px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white text-[#307BC4] border border-[#307BC4] font-semibold hover:bg-[#307BC4]/5 text-[10px] xs:text-xs sm:text-sm md:text-base">
              Online Consultation
            </Link>
            <Link to="/home-visit" className="w-full text-center px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white text-[#307BC4] border border-[#307BC4] font-semibold hover:bg-[#307BC4]/5 text-[10px] xs:text-xs sm:text-sm md:text-base">
              Home Visit
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION-03 — Book An Appointment */}
      <section
        className="pt-10 md:pt-16 lg:pt-20 pb-0 relative overflow-hidden"
        style={{
          backgroundImage: `url(${ASSET('doctor-schedule-background.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center md:items-end">

            {/* Doctor image — hidden on small screens */}
            <div className="hidden md:flex justify-center lg:justify-start items-end self-end">
              <img
                src={ASSET('doctor-schedule-image.png')}
                alt=""
                className="w-full h-auto object-contain object-bottom max-w-md md:max-w-xl lg:max-w-2xl block"
                style={{
                  marginBottom: '5px',
                  marginLeft: '-150px',
                  height: '900px',
                  width: '900px',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x500/E6F0FF/333?text=Doctor';
                }}
              />
            </div>

            {/* Booking form — centered on small screens only */}
            <div className="pb-10 md:pb-16 w-full max-w-md mx-auto md:max-w-none md:mx-0">
              <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-6 text-center md:text-left">
                BOOK AN Appointment
              </h2>
              <BookingForm defaultDoctor="faiza-malik" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION-04 — CTA */}
      <section className="py-10 md:py-16 lg:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-sm xs:text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Don't Let Your Health Take a Backseat!
              </h2>
              <p className="mt-1.5 md:mt-4 text-gray-600 text-[10px] xs:text-xs sm:text-sm md:text-base max-w-lg">
                Schedule an appointment with one of our experienced and professional doctors!
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <img
                src={ASSET('cta-doctor-shield.png')}
                alt=""
                className="w-full h-auto object-contain max-w-[140px] sm:max-w-[200px] md:max-w-sm relative z-0"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/E6F0FF/333?text=Doctor'; }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
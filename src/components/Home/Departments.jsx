import { Link } from 'react-router-dom';
import SectionTitle from '../Shared/SectionTitle';
import { ASSET } from '../../utils/asset';

const clinicServices = [
  { name: 'Psychiatry', icon: 'dept-icon-neurology.svg', desc: 'Mental health care', to: '/doctor/rizwan-shafiq' },
  { name: 'Pediatric', icon: 'dept-icon-pediatric.svg', desc: 'Child health care', to: '/doctor/faiza-malik' },
  { name: 'Online Consultation', icon: 'contact-phone.svg', desc: 'Consult from anywhere', to: '/online-consultation' },
  { name: 'Home Visit', icon: 'contact-location.svg', desc: 'Care at your doorstep', to: '/home-visit' },
  { name: 'Emergency', icon: 'dept-icon-emergency.svg', desc: '24/7 availability', to: '/emergency' },
  { name: 'Follow-up Care', icon: 'dept-award-icon.svg', desc: 'Medication & progress', to: '/services' },
];

const serviceDetails = [
  { title: 'Mental Health Services', desc: 'Comprehensive psychiatric care: depression, anxiety, OCD, bipolar, schizophrenia, stress, sleep disorders, and more.', to: '/doctor/rizwan-shafiq' },
  { title: 'Pediatric Services', desc: 'Complete child healthcare: checkups, vaccination, digestive issues, respiratory problems, growth monitoring, nutrition.', to: '/doctor/faiza-malik' },
  { title: 'Online Consultation', desc: 'Consult from anywhere in Pakistan via Zoom, WhatsApp Video, or Google Meet. E-prescription delivered.', to: '/online-consultation' },
  { title: 'Home Visit', desc: 'Professional care at your doorstep. Lahore areas covered. Zone-based pricing.', to: '/home-visit' },
];

export default function Departments() {
  return (
    <>
      <section className="py-16 md:py-20 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <SectionTitle title="Our Services" subtitle="What We Offer" />

          <div className="mt-12 space-y-4">

            {/* First row — always 4 items */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {clinicServices.slice(0, 4).map((d) => (
                <Link
                  key={d.name}
                  to={d.to}
                  className="flex items-center gap-2 md:gap-4 bg-white rounded-lg shadow p-3 md:p-4 hover:shadow-md transition"
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <img src={ASSET(d.icon)} alt="" className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs md:text-base">{d.name}</p>
                    <p className="text-xs text-gray-600 hidden sm:block">{d.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Second row — 2 items centered */}
<div className="grid grid-cols-2 gap-4 w-full lg:w-1/2 mx-auto">
              {clinicServices.slice(4).map((d) => (
                <Link
                  key={d.name}
                  to={d.to}
                  className="flex items-center gap-2 md:gap-4 bg-white rounded-lg shadow p-3 md:p-4 hover:shadow-md transition"
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <img src={ASSET(d.icon)} alt="" className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs md:text-base">{d.name}</p>
                    <p className="text-xs text-gray-600 hidden sm:block">{d.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <SectionTitle title="Explore Our Services" subtitle="Clinic, online, and home visit options" />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {serviceDetails.map((d) => (
              <div key={d.title} className="border border-gray-100 rounded-lg shadow-md p-3 md:p-6">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src={ASSET('dept-award-icon.svg')} alt="" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
                </div>
                <h3 className="mt-2 md:mt-4 font-bold text-gray-900 text-xs md:text-base">{d.title}</h3>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-600 hidden sm:block">{d.desc}</p>
                <Link to={d.to} className="inline-block mt-2 md:mt-4 text-primary font-medium text-xs md:text-sm hover:underline">
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
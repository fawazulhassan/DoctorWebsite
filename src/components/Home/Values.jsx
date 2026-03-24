import SectionTitle from '../Shared/SectionTitle';
import { ASSET } from '../../utils/asset';

const whyChooseUs = [
  { title: 'Dual Expertise',       icon: 'value-icon-compassion.png' },
  { title: 'FCPS Qualified',       icon: 'value-icon-excellence.svg' },
  { title: 'Online Consultation',  icon: 'value-icon-integrity.svg'  },
  { title: 'Home Visit',           icon: 'value-icon-respect.png'    },
  { title: 'Teamwork',             icon: 'value-icon-teamwork.png'   },
];

const descs = {
  'Dual Expertise':      'Psychiatry and Paediatrics under one roof. Mental health and child care from FCPS-qualified specialists.',
  'FCPS Qualified':      'Dr. Rizwan (FCPS Psychiatry) and Dr. Faiza (FCPS Paediatrics) bring the highest standards of care.',
  'Online Consultation': 'Consult from anywhere in Pakistan via Zoom, WhatsApp Video, or Google Meet.',
  'Home Visit':          'Professional medical care at your doorstep. Lahore areas covered with zone-based pricing.',
  'Teamwork':            'We believe in working collaboratively with our team members and other healthcare professionals to provide comprehensive and effective care.',
};

const IconDisplay = ({ icon }) => (
  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto sm:mt-[10px] md:mt-[15px] lg:mt-[20px] flex items-center justify-center overflow-hidden">
    <img
      src={ASSET(icon)}
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.8)' }}
      onError={(e) => (e.target.style.display = 'none')}
    />
  </div>
);

const Card = ({ v }) => (
  <div className="services-card bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-md px-2 pt-3 pb-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6 md:pb-4 text-center hover:shadow-lg transition-shadow duration-200">
    <IconDisplay icon={v.icon} />
    <h3 className="mt-1 md:mt-2 font-bold text-gray-900 text-xs sm:text-sm md:text-lg leading-tight">{v.title}</h3>
    <p className="mt-1 text-xs md:text-sm text-gray-600 leading-relaxed">{descs[v.title]}</p>
  </div>
);

export default function Values({ items = whyChooseUs }) {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Why Choose Us" subtitle="Dual expertise, FCPS qualified, online and home services" />

        <div className="mt-6 md:mt-12 space-y-3 md:space-y-6">

          {/* First row — always 3 items */}
          <div className="grid grid-cols-3 gap-2 md:gap-6">
            {items.slice(0, 3).map((v) => (
              <Card key={v.title} v={v} />
            ))}
          </div>

          {/* Second row — always 2 items centered */}
          <div className="grid grid-cols-2 gap-2 md:gap-6 w-2/3 mx-auto">
            {items.slice(3).map((v) => (
              <Card key={v.title} v={v} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
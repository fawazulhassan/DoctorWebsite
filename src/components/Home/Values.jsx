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

// Wide strip assets (45px tall); position crops to the blue circle at a uniform size
const iconPosition = {
  'value-icon-compassion.png': '44% center',
  'value-icon-excellence.svg': '45% center',
  'value-icon-integrity.svg': '46% center',
  'value-icon-respect.png': '46% center',
  'value-icon-teamwork.png': '45% center',
};

const IconDisplay = ({ icon, title }) => (
  <div
    className="mx-auto h-14 w-14 shrink-0 overflow-hidden rounded-full sm:mt-[10px] sm:h-16 sm:w-16 md:mt-[15px] md:h-20 md:w-20 lg:mt-[20px] lg:h-24 lg:w-24"
    role="img"
    aria-label={title}
    style={{
      backgroundColor: '#307BC4',
      backgroundImage: `url(${ASSET(icon)})`,
      backgroundSize: 'auto 100%',
      backgroundPosition: iconPosition[icon] ?? '46% center',
      backgroundRepeat: 'no-repeat',
    }}
  />
);

const Card = ({ v }) => (
  <div className="services-card bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-md px-2 pt-3 pb-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6 md:pb-4 text-center hover:shadow-lg transition-shadow duration-200">
    <IconDisplay icon={v.icon} title={v.title} />
    <h3 className="mt-1 md:mt-2 font-bold text-gray-900 text-xs sm:text-sm md:text-lg leading-tight">{v.title}</h3>
    <p className="mt-1 text-xs md:text-sm text-gray-600 leading-relaxed">
      {v.title === 'Dual Expertise' ? (
        <>
          <span className="hidden sm:inline">Psychiatry and Paediatrics under one roof. </span>
          Mental health and child care from FCPS-qualified specialists.
        </>
      ) : v.title === 'FCPS Qualified' ? (
        <>
          Dr. Rizwan (FCPS Psychiatry) and Dr. Faiza (FCPS Paediatrics)
          <span className="hidden sm:inline"> bring the highest standards of care.</span>
        </>
      ) : v.title === 'Online Consultation' ? (
        <>
          Consult from anywhere in Pakistan
          <span className="hidden sm:inline"> via Zoom, WhatsApp Video, or Google Meet.</span>
        </>
      ) : v.title === 'Home Visit' ? (
        <>
          Professional medical care at your doorstep.
          <span className="hidden sm:inline"> Lahore areas covered with zone-based pricing.</span>
        </>
      ) : v.title === 'Teamwork' ? (
        <>
          We believe in working collaboratively with our team members
          <span className="hidden sm:inline"> and other healthcare professionals to provide comprehensive and effective care.</span>
        </>
      ) : (
        descs[v.title]
      )}
    </p>
  </div>
);

export default function Values({ items = whyChooseUs }) {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle
          title="Why Choose Us"
          subtitle="Dual expertise, FCPS qualified, online and home services"
          subtitleClassName="hidden sm:block"
        />

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
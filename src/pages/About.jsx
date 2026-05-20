import React from 'react';
import './About.css';
import { CLINIC } from '../constants/clinic';

// ── Asset imports from public/about ──────────────────────────────
// Hero
const heroBg          = '/about/hero-bg.png';
const heroBlobLeft    = '/about/hero-blob-left.png';
const heroBlobRight   = '/about/hero-blob-right.png';
const heroDoctorCutout = '/about/hero-doctor-cutout.png';

// Services
const calendarWhite   = '/about/calendar-white.svg';
const arrowWhite      = '/about/arrow-white.svg';

// Why Choose Us
const whyChooseUs     = '/about/why-choose-us.jpg';
const professional    = '/about/professional.svg';
const comprehensive   = '/about/comprehensive.svg';
const patient         = '/about/patient.svg';
const facilities      = '/about/facilities.svg';

// Stats
const statsBg         = '/about/stats-bg.png';

// Doctors
const drJamesLee      = '/about/doctor-james-lee.png';
const drJohnSmith     = '/about/doctor-john-smith.png';
const drSusanBones    = '/about/doctor-susan-bones.png';
const socialCircle    = '/about/social-circle.png';
const vectorTwitter   = '/about/vector-twitter.svg';

// Gallery
const facilityImg1    = '/about/facility-image-1.png';
const facilityImg2    = '/about/facility-image-2.png';
const facilityImg3    = '/about/facility-image-3.png';
const facilityImg4    = '/about/facility-image-4.png';
const facilityImg5    = '/about/facility-image-5.png';

// Awards
const awardIcon       = '/about/award-icon.png';

// CTA
const ctaBg           = '/about/cta-bg.png';

// ── Data ─────────────────────────────────────────────────────────

const services = [
  {
    title: 'Mental health services',
    body:
      'Comprehensive psychiatric care for depression, anxiety, OCD, bipolar disorder, schizophrenia, sleep problems, and more.',
    hideBodyOnMobile: true,
  },
  {
    title: 'Child health & pediatrics',
    body:
      'General child health checkups, vaccination, digestive and respiratory issues, and growth monitoring for children.',
    hideBodyOnMobile: true,
  },
  {
    title: 'Online video consultation',
    body:
      'Secure video consultations so patients in Lahore, Kasur, and beyond can receive expert advice and e‑prescriptions from home.',
    hideBodyOnMobile: true,
  },
  {
    title: 'Home visit service (Lahore)',
    body:
      'Professional medical care at your doorstep for elderly patients, critically ill children, post‑hospital care, and newborn checkups.',
    hideBodyOnMobile: true,
  },
  {
    title: 'Follow-up & ongoing care',
    body:
      'Medication management, progress monitoring, and structured follow‑ups that support long‑term mental and child health.',
    hideBodyOnMobile: true,
  },
];

const whyFeatures = [
  {
    icon: professional,
    title: 'Dual-specialty clinic',
    body:
      'Care for both adults and children under one roof, led by a psychiatrist and a pediatrician working together for family wellness.',
    hideBodyOnMobile: true,
  },
  {
    icon: comprehensive,
    title: 'Comprehensive services',
    body:
      'From preventive checkups to complex mental health and pediatric conditions, we provide end‑to‑end care and structured follow‑ups.',
    hideBodyOnMobile: true,
  },
  {
    icon: patient,
    title: 'Patient-center approach',
    body:
      'Every treatment plan is tailored to your needs, with time given to listen, educate, and involve families in every decision.',
    hideBodyOnMobile: true,
  },
  {
    icon: facilities,
    title: 'Accessible in Lahore & Kasur',
    body:
      'Online consultations, Lahore home visits, and Kasur clinic days make quality care accessible to patients across both cities.',
    hideBodyOnMobile: true,
  },
];

const stats = [
  { number: '20+',   label: 'Years of experience'           },
  { number: '95%',   label: 'Patient satisfaction rating'   },
  { number: '5000+', label: 'Patients served annually'      },
  { number: '10+',   label: 'Healthcare providers on staff' },
  { number: '22+',   label: 'Convenient locations in the area' },
];

const doctors = [
  {
    photo: drJamesLee,
    name: 'Dr. Rizwan Shafiq',
    title: 'M.B.B.S, R.M.P, FCPS Part 2 (Psychiatry)',
    desc:
      'Psychiatrist providing compassionate care for depression, anxiety, OCD, bipolar disorder, schizophrenia, stress, sleep disorders, and other mental health conditions.',
    link: '/doctor/rizwan-shafiq',
  },
  {
    photo: drJohnSmith,
    name: 'Dr. Faiza Malik Jabeen',
    title: 'M.B.B.S, F.C.P.S (Paediatrics)',
    desc:
      'Pediatrician focused on child health and development, including vaccinations, digestive and respiratory issues, growth monitoring, and newborn care.',
    link: '/doctor/faiza-malik',
  },
  {
    photo: drSusanBones,
    name: 'Our care team',
    title: CLINIC.name,
    desc:
      'Working together across Lahore and Kasur to provide accessible mental health and pediatric care through clinic visits, online consultations, and home visits.',
    link: '/book-appointment',
  },
];

const awards = [
  'Malcolm Baldrige National Quality Award',
  'HIMSS Davies Award',
  "Healthgrades National's Best Hospital",
  'Joint Commission Gold Seal of Approval',
];

// ── Sub-components ────────────────────────────────────────────────

function ServiceCard({ title, body, hideBodyOnMobile }) {
  return (
    <div className="service-card">
      <div className="service-card__icon-wrap">
        <img src={calendarWhite} alt="service icon" />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className={`service-card__body${hideBodyOnMobile ? ' service-card__body--hide-mobile' : ''}`}>{body}</p>
      <div className="service-card__arrow">
        <img src={arrowWhite} alt="arrow" />
      </div>
    </div>
  );
}

function WhyFeature({ icon, title, body, hideBodyOnMobile }) {
  return (
    <div className="why-feature">
      <div className="why-feature__icon-wrap">
        <img src={icon} alt={title} />
      </div>
      <h4 className="why-feature__title">{title}</h4>
      <p className={`why-feature__body${hideBodyOnMobile ? ' why-feature__body--hide-mobile' : ''}`}>{body}</p>
    </div>
  );
}

function DoctorCard({ photo, name, title, desc, link }) {
  return (
    <div className="doctor-card">
      <div className="doctor-card__photo-wrap">
        <img src={photo} alt={name} />
      </div>
      <div className="doctor-card__body">
        <h3 className="doctor-card__name">{name}</h3>
        <p className="doctor-card__title">{title}</p>
        <p className="doctor-card__desc">{desc}</p>
        {link && (
          <a href={link} className="doctor-card__link">
            Learn more
          </a>
        )}
        <div className="doctor-card__socials">
          {/* Facebook */}
          <div className="social-btn">
            <img className="social-btn__bg" src={socialCircle} alt="" />
            <span className="social-btn__icon">f</span>
          </div>
          {/* LinkedIn */}
          <div className="social-btn">
            <img className="social-btn__bg" src={socialCircle} alt="" />
            <span className="social-btn__icon">in</span>
          </div>
          {/* Twitter */}
          <div className="social-btn">
            <img className="social-btn__bg" src={socialCircle} alt="" />
            <span className="social-btn__icon">
              <img src={vectorTwitter} alt="twitter" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────

export default function About() {
  return (
    <div className="about-page">

      {/* ── SECTION 1: HERO ─────────────────────────────────── */}
      <section className="about-hero">
        <img className="about-hero__bg"         src={heroBg}           alt="" />
        <img className="about-hero__doctor"     src={heroDoctorCutout} alt="Doctor" />
        <div className="about-hero__content">
          <h1 className="about-hero__heading">
            Welcome to<br />
            {CLINIC.shortName}
          </h1>
          <p className="about-hero__subheading">
            Accessible mental health and pediatric care for Lahore and Kasur. Your wellness is our priority.
          </p>
        </div>
      </section>

{/* ── SECTION 2: SERVICES ─────────────────────────────── */}
<section className="about-services">
  <div className="about-services__grid">
    <div className="about-services__intro">
      <p className="about-services__label">Services</p>
      <h2 className="about-services__heading">
        Provides Our<br />Best Services
      </h2>
    </div>
    {services.map((s, i) => (
      <ServiceCard key={i} title={s.title} body={s.body} hideBodyOnMobile={s.hideBodyOnMobile} />
    ))}
  </div>
</section>

      {/* ── SECTION 3: WHY CHOOSE US ────────────────────────── */}
      <section className="about-why">
        <div className="about-why__inner">
          <div className="about-why__image-wrap">
            <img src={whyChooseUs} alt="Why Choose Us" />
          </div>
          <div className="about-why__content">
            <h2 className="about-why__heading">Why Choose Us</h2>
            <div className="about-why__grid">
              {whyFeatures.map((f, i) => (
                <WhyFeature key={i} icon={f.icon} title={f.title} body={f.body} hideBodyOnMobile={f.hideBodyOnMobile} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: STATS BANNER ─────────────────────────── */}
      <section className="about-stats">
        <div className="about-stats__inner">
          <img className="about-stats__bg" src={statsBg} alt="" />
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <p className="stat-item__number">{s.number}</p>
              <p className="stat-item__label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: DOCTORS ──────────────────────────────── */}
      <section className="about-doctors">
        <div className="about-doctors__header">
          <p className="about-doctors__label">Meet Our</p>
          <h2 className="about-doctors__heading">Experts Doctor</h2>
        </div>
        <div className="about-doctors__grid">
          {doctors.map((d, i) => (
            <DoctorCard
              key={i}
              photo={d.photo}
              name={d.name}
              title={d.title}
              desc={d.desc}
              link={d.link}
            />
          ))}
        </div>
      </section>

      <section className="about-gallery">
  <div className="about-gallery__header">
    <p className="about-gallery__label">Have a Look At</p>
    <h2 className="about-gallery__heading">
      Our Facilities and<br />Latest Activities
    </h2>
  </div>

  <div className="about-gallery__new-grid">

    {/* LEFT — 2x2 grid */}
    <div className="gallery-new-left">
      <div className="gallery-img gallery-img--small">
        <img src={facilityImg2} alt="Facility" />
      </div>
      <div className="gallery-img gallery-img--small">
        <img src={facilityImg3} alt="Facility" />
      </div>
      <div className="gallery-img gallery-img--small">
        <img src={facilityImg4} alt="Facility" />
      </div>
      <div className="gallery-img gallery-img--small">
        <img src={facilityImg5} alt="Facility" />
      </div>
    </div>

    {/* RIGHT — 1 tall image spanning full height */}
    <div className="gallery-new-right">
      <div className="gallery-img gallery-img--right-tall">
        <img src={facilityImg1} alt="Facility" />
      </div>
    </div>

  </div>
</section>

      {/* ── SECTION 7: AWARDS ───────────────────────────────── */}
      <section className="about-awards">
        <div className="about-awards__header">
          <p className="about-awards__label">Awards</p>
          <h2 className="about-awards__heading">
            Winning Awards and<br />Recognition
          </h2>
          <p className="about-awards__subtitle">
            We have been recognized for our commitment to<br />
            excellence in healthcare.
          </p>
        </div>
        <div className="about-awards__grid">
          {awards.map((name, i) => (
            <div className="award-card" key={i}>
              <div className="award-card__icon-wrap">
                <img src={awardIcon} alt="award" />
              </div>
              <p className="award-card__name">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 8: CTA BANNER ───────────────────────────── */}
      <section className="about-cta">
        <div className="about-cta__inner">
          <img className="about-cta__bg" src={ctaBg} alt="" />
          <div className="about-cta__content">
            <h2 className="about-cta__heading">
              Don't Let Your Health<br />Take a Backseat!
            </h2>
            <p className="about-cta__subheading">
              Schedule an appointment with one of our experienced<br />
              medical professionals today!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
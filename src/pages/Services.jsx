import React from 'react';
import './Departments.css';

const bannerBg   = '/departments/banner-bg.png';
const bannerImg  = '/departments/banner-img.png';
const ctaDoctor  = '/departments/cta-doctor.png';
const iconDept   = '/departments/icon-dept.svg';
const arrowWhite = '/departments/arrow-white.svg';

// ── Data — Services data (aligned with MASTER.md §5 Services Page) ─────────────
const DEPT_BODY_MENTAL =
  'Comprehensive psychiatric care for depression, anxiety, OCD, bipolar disorder, schizophrenia, stress';
const DEPT_BODY_MENTAL_MORE =
  ', sleep disorders, and other mental health conditions, using medication, counseling, and therapy with full confidentiality and planned follow-ups.';
const DEPT_BODY_PEDIATRIC =
  'Complete child healthcare including preventive care and vaccines, growth and weight monitoring';
const DEPT_BODY_PEDIATRIC_MORE =
  ', acute illness treatment, chronic condition management, and nutrition and development counseling with structured parent education.';
const DEPT_BODY_ONLINE =
  'Book your slot, complete payment, and join a secure video call to receive expert psychiatric or pediatric ';
const DEPT_BODY_ONLINE_MORE =
  'advice from home anywhere in Pakistan, with an e‑prescription and summary shared after the consultation.';
const DEPT_BODY_HOME =
  'Lahore-only home visits for elderly or home-bound patients, critically ill children';
const DEPT_BODY_HOME_MORE =
  ', post-hospital care, and newborn checkups, with charges that combine consultation time and travel in a clear, zone-based structure.';
const DEPT_BODY_FOLLOWUP =
  'Ongoing medication management and progress review through scheduled follow-ups';
const DEPT_BODY_FOLLOWUP_MORE =
  ', with shorter review visits and remote check-ins where appropriate to keep your treatment on track.';
const DEPT_BODY_EMERGENCY =
  '24/7 emergency consultation access for urgent psychiatric and pediatric concerns via call, WhatsApp';
const DEPT_BODY_EMERGENCY_MORE =
  ', or the emergency form, with priority triage and guidance on immediate steps or hospital referral.';

const departmentRows = [
  // Row 1
  [
    { title: ['Mental health', 'services'],        body: DEPT_BODY_MENTAL, bodyMore: DEPT_BODY_MENTAL_MORE, link: '/doctor/rizwan-shafiq', linkText: 'Meet Dr. Rizwan Shafiq' },
    { title: ['Child health', '& pediatrics'],     body: DEPT_BODY_PEDIATRIC, bodyMore: DEPT_BODY_PEDIATRIC_MORE, link: '/doctor/faiza-malik',   linkText: 'Meet Dr. Faiza Malik' },
    { title: ['Online video', 'consultation'],     body: DEPT_BODY_ONLINE, bodyMore: DEPT_BODY_ONLINE_MORE, link: '/online-consultation',  linkText: 'Learn more' },
  ],
  // Row 2
  [
    { title: ['Home visit service', '(Lahore)'],   body: DEPT_BODY_HOME, bodyMore: DEPT_BODY_HOME_MORE, link: '/home-visit',           linkText: 'Learn more' },
    { title: ['Follow-up &', 'ongoing care'],      body: DEPT_BODY_FOLLOWUP, bodyMore: DEPT_BODY_FOLLOWUP_MORE, link: null,                    linkText: null },
    { title: ['Emergency', 'consultation'],        body: DEPT_BODY_EMERGENCY, bodyMore: DEPT_BODY_EMERGENCY_MORE, link: '/emergency',            linkText: 'Emergency form' },
  ],
];

// ── Sub-components ────────────────────────────────────────────────

function DeptCard({ title, body, bodyMore, link, linkText, tall = false }) {
  const arrow = (
    <div className="dept-card__arrow" aria-label="Learn more">
      <img src={arrowWhite} alt="" aria-hidden="true" />
    </div>
  );

  return (
    <div className={`dept-card${tall ? ' dept-card--tall' : ''}`}>
      <div className="dept-card__top">
        <img
          className="dept-card__icon"
          src={iconDept}
          alt="department icon"
          loading="lazy"
        />
        <h3 className="dept-card__title">
          {title.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < title.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
      </div>
      <p className="dept-card__body">
        {body}
        {bodyMore && <span className="dept-card__body-more">{bodyMore}</span>}
      </p>
      {link && (
        <a href={link} className="dept-card__link">
          {linkText}
        </a>
      )}
      {link ? (
        <a href={link} aria-label={linkText || 'Learn more'}>
          {arrow}
        </a>
      ) : (
        arrow
      )}
    </div>
  );
}

function DeptHero() {
  return (
    <section className="dept-hero">
      <img className="dept-hero__bg" src={bannerBg} alt="" aria-hidden="true" />
      <div className="dept-hero__content">
        <h1 className="dept-hero__heading">
          Our Services
        </h1>
        <p className="dept-hero__subheading">
          Integrated psychiatry, pediatrics, and special services designed
          to meet your individual needs and support better health for you and your family.
        </p>
      </div>
      <div className="dept-hero__image-wrap">
        <img
          className="dept-hero__image"
          src={bannerImg}
          alt="Our Services"
        />
      </div>
    </section>
  );
}

function DeptCardsGrid() {
  return (
    <section className="dept-cards">
      {departmentRows.map((row, rowIdx) => (
        <div key={rowIdx} className="dept-cards__row">
          {row.map((card, colIdx) => (
            <DeptCard
              key={colIdx}
              title={card.title}
              body={card.body}
              bodyMore={card.bodyMore}
              link={card.link}
              linkText={card.linkText}
              tall={card.tall || false}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

function DeptCta() {
  return (
    <section className="dept-cta">
      <div className="dept-cta__inner">
        <img
          className="dept-cta__doctor"
          src={ctaDoctor}
          alt="Healthcare professional"
          loading="lazy"
        />
        <div className="dept-cta__content">
          <h2 className="dept-cta__heading">
            Don't Let Your Health<br />
            Take a Backseat!
          </h2>
          <p className="dept-cta__subheading">
            Schedule an appointment with one of our<br />
            experienced medical professionals today!
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <div className="departments-page">
      <DeptHero />
      <DeptCardsGrid />
      <DeptCta />
    </div>
  );
}

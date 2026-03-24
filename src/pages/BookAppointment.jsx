import './AppointmentSection.css';
import BookingForm from '../components/Shared/BookingForm';
import { CLINIC } from '../constants/clinic';

// ── Assets from public/appointments/ ─────────────────────────────
const bannerBg = '/appointments/banner-bg.png';
const doctorCutout = '/appointments/hero-doctor-cutout.png';
const contactImg = '/appointments/contact-info-img.png';

function AppointmentHero() {
  return (
    <section className="appt-hero">
      <img className="appt-hero__bg" src={bannerBg} alt="" aria-hidden="true" />
      <img
        className="appt-hero__doctor"
        src={doctorCutout}
        alt="Healthcare professional"
      />
      <div className="appt-hero__content">
        <h1 className="appt-hero__heading">
          Don&apos;t Let Your Health
          <br />
          Take a Backseat!
        </h1>
        <p className="appt-hero__subheading">
          Fill out the appointment form below to schedule a consultation with one of our
          healthcare professionals.
        </p>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div className="appt-contact">
      <h2 className="appt-contact__heading">Contact Info</h2>
      <img
        className="appt-contact__image"
        src={contactImg}
        alt="Doctor holding phone"
        loading="lazy"
      />
      <div className="appt-contact__item">
        <p className="appt-contact__item-label">Phone</p>
        <p className="appt-contact__item-value">{CLINIC.phone}</p>
      </div>
      <div className="appt-contact__item">
        <p className="appt-contact__item-label">Email Us</p>
        <p className="appt-contact__item-value">{CLINIC.email}</p>
      </div>
      <div className="appt-contact__item">
        <p className="appt-contact__item-label">Our Location</p>
        <p className="appt-contact__item-value">
          {CLINIC.lahore.address} / {CLINIC.kasur.address}
        </p>
      </div>
    </div>
  );
}

export default function BookAppointment() {
  return (
    <>
      <AppointmentHero />
      <section className="appt-main">
        <div className="appt-main__inner">
          <div className="appt-form appt-form--shared">
            <h2 className="appt-form__heading">Appointment</h2>
            <BookingForm />
          </div>
          <ContactInfo />
        </div>
      </section>
    </>
  );
}

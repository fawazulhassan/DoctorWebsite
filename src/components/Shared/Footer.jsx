import { Link } from 'react-router-dom';
import { ASSET } from '../../utils/asset';
import { CLINIC, WHATSAPP_URL } from '../../constants/clinic';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Doctors', to: '/doctor/rizwan-shafiq' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const footerServices = [
  { label: 'Online Consultation', to: '/online-consultation' },
  { label: 'Home Visit', to: '/home-visit' },
  { label: 'Emergency', to: '/emergency' },
  { label: 'Payment', to: '/book-appointment' },
];

export default function Footer() {
  return (
    <div className="relative">

      {/* Shield */}
      <div className="absolute -top-16 sm:-top-16 md:-top-24 left-1/2 -translate-x-1/2 z-20">
        <img
          src={ASSET('footer-shield.svg')}
          alt=""
          className="w-32 h-32 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-64 lg:h-64 object-contain"
        />
      </div>

      {/* Footer */}
      <footer className="footer relative overflow-hidden bg-white pt-20 md:pt-36 lg:pt-44 pb-0">
        <div
          className="absolute inset-x-0 top-0 h-full md:h-[400px] lg:h-[480px] pointer-events-none z-0"
          aria-hidden
        >
          <img
            src={ASSET('footer-bg-wave.svg')}
            alt=""
            className="w-full h-full object-cover object-top pointer-events-none opacity-40"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-2">

          {/* Always 4 columns */}
          <div className="footer__content grid grid-cols-4 gap-1 lg:gap-2 pb-4">

            {/* Col 1 — Clinic info */}
            <div>
              <Link to="/">
                <img
                  src={ASSET('footer-logo.png')}
                  alt="Health & Mind Care Clinic"
                  className="h-8 object-contain w-auto mb-1"
                />
              </Link>
              <div className="footer__contact space-y-0.5">
                <p className="flex items-start gap-1 md:gap-2 text-xs md:text-sm text-gray-700 md:hidden leading-tight">
                  <img src={ASSET('footer-icon-location.svg')} alt="" className="w-3 h-3 shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    {CLINIC.lahore.label}
                    <br />
                    {CLINIC.kasur.label}
                  </span>
                </p>
                <p className="hidden md:flex items-start gap-2 text-sm text-gray-700 leading-tight">
                  <img src={ASSET('footer-icon-location.svg')} alt="" className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-tight">{CLINIC.lahore.address} / {CLINIC.kasur.address}</span>
                </p>
                <a href={`tel:${CLINIC.phone}`} className="flex items-center gap-1.5 text-xs md:text-sm text-gray-700 hover:text-primary leading-tight">
  <img src={ASSET('footer-icon-phone.svg')} alt="" className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
  <span className="truncate">{CLINIC.phone}</span>
</a>
                <a href={`mailto:${CLINIC.email}`} className="flex items-center gap-1.5 text-xs md:text-sm text-gray-700 hover:text-primary leading-tight">
  <img src={ASSET('footer-icon-email.svg')} alt="" className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
  <span className="break-all">{CLINIC.email}</span>
</a>
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="mt-10 md:mt-0 ml-6 lg:ml-24">
              <h3 className="font-bold text-gray-900 mb-0.5 text-xs md:text-base leading-tight">Quick Links</h3>
              <ul className="footer__links space-y-0">
                {quickLinks.map((link) => (
                  <li key={link.label} className="leading-none">
                    <Link to={link.to} className="text-xs md:text-sm text-gray-700 hover:text-primary leading-tight">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div className="mt-10 md:mt-0 lg:ml-8">
              <h3 className="font-bold text-gray-900 mb-0.5 text-xs md:text-base leading-tight">Our Services</h3>
              <ul className="footer__links space-y-0">
                {footerServices.map((link) => (
                  <li key={link.label} className="leading-none">
                    <Link to={link.to} className="text-xs md:text-sm text-gray-700 hover:text-primary leading-tight">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Newsletter */}
            <div className="mt-10 md:mt-0 lg:ml-12">
              <h3 className="font-bold text-gray-900 mb-0.5 text-xs md:text-base leading-tight">Newsletter</h3>
              <p className="text-xs md:text-sm text-gray-700 mb-1 hidden md:block leading-tight">Join Our Newsletter</p>
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-1 py-1 md:px-4 md:py-3 text-xs md:text-sm border-0 focus:ring-2 focus:ring-primary outline-none min-w-0 w-0"
                />
                <button
                  type="button"
                  className="flex items-center justify-center px-1 md:px-4 bg-primary text-white hover:bg-primary-hover shrink-0"
                >
                  <img src={ASSET('footer-submit-arrow.svg')} alt="" className="w-3 h-3 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="bg-[#2A67D8] w-screen relative left-1/2 -translate-x-1/2 py-3 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-row items-center justify-between gap-2">
              <p className="text-xs md:text-sm text-white">© 2024 {CLINIC.shortName}. All rights reserved.</p>
              <div className="flex items-center gap-3 md:gap-4">
                <a href="#" className="text-white hover:opacity-80" aria-label="Facebook">
                  <img src={ASSET('footer-social-facebook.svg')} alt="" className="w-4 h-4 md:w-5 md:h-5 invert" />
                </a>
                <a href="#" className="text-white hover:opacity-80" aria-label="LinkedIn">
                  <img src={ASSET('footer-social-linkedin.svg')} alt="" className="w-4 h-4 md:w-5 md:h-5 invert" />
                </a>
                <a href="#" className="text-white hover:opacity-80" aria-label="Instagram">
                  <img src={ASSET('footer-social-instagram.svg')} alt="" className="w-4 h-4 md:w-5 md:h-5 invert" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
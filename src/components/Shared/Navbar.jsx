import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ASSET } from '../../utils/asset';
import { useAuth } from '../../contexts/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Dr. Rizwan', to: '/doctor/rizwan-shafiq' },
  { label: 'Dr. Faiza', to: '/doctor/faiza-malik' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, profile, isAdmin, isDoctor, loading, signOut } = useAuth();
  const userMenuRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [userMenuOpen]);

  const initial = (profile?.full_name || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <>
      <header className="navbar bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="navbar__logo h-8 flex items-center">
              <img
                src={ASSET('nav-logo.png')}
                alt="ProHealth"
                className="h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden font-bold text-gray-900 text-xl">Health & Mind Care Clinic</span>
            </Link>
            <nav className="navbar__nav hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-gray-700 hover:text-primary text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <button type="button" className="p-2" aria-label="Search">
                <img src={ASSET('nav-search.svg')} alt="" className="w-6 h-6 text-gray-600" />
              </button>

              {/* Auth buttons — Desktop */}
              {!loading && !user && (
                <Link
                  to="/auth"
                  className="hidden md:inline-flex items-center px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
                >
                  Login
                </Link>
              )}

              <Link
                to="/book-appointment"
                className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover"
              >
                Make Appointment
              </Link>

              {/* User menu — Desktop */}
              {!loading && user && (
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      {initial}
                    </div>
                    <span className="text-sm text-gray-700 hidden lg:inline max-w-[120px] truncate">
                      {profile?.full_name || 'Account'}
                    </span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <Link to="/my-appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                        My Appointments
                      </Link>

                      {isDoctor && (
                        <>
                          <Link to="/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                            Doctor Dashboard
                          </Link>
                          <Link to="/doctor/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                            Booked Appointments
                          </Link>
                          <Link to="/doctor/consultations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                            My Consultations
                          </Link>
                          <Link to="/doctor/schedule" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                            My Schedule
                          </Link>
                          <hr className="my-1 border-gray-100" />
                        </>
                      )}
                      {isAdmin && (
                        <>
                          <Link to="/admin/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                            Admin Appointments
                          </Link>
                          <Link to="/admin/doctors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                            Admin Doctors
                          </Link>
                          <Link to="/admin/patients" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setUserMenuOpen(false)}>
                            Admin Patients
                          </Link>
                          <hr className="my-1 border-gray-100" />
                        </>
                      )}

                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hamburger */}
              <button
                type="button"
                className="lg:hidden p-2"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Menu"
              >
                <img src={ASSET('hamburger-menu.svg')} alt="" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile nav drawer */}
      <div
        className={`fixed top-[65px] right-0 w-64 bg-white shadow-xl z-50 p-4 lg:hidden transform transition ${
          mobileNavOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="navbar__nav-mobile flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-gray-700 hover:text-primary"
              onClick={() => setMobileNavOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <hr className="border-gray-200" />

          {!loading && !user && (
            <>
              <Link
                to="/auth"
                className="text-primary font-medium"
                onClick={() => setMobileNavOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth"
                state={{ tab: 'signup' }}
                className="text-gray-700 hover:text-primary"
                onClick={() => setMobileNavOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          {!loading && user && isDoctor && (
            <>
              <Link to="/doctor" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>Doctor Dashboard</Link>
              <Link to="/doctor/appointments" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>Booked Appointments</Link>
              <Link to="/doctor/consultations" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>My Consultations</Link>
              <Link to="/doctor/schedule" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>My Schedule</Link>
            </>
          )}

          {!loading && user && isAdmin && (
            <>
              <Link to="/admin/appointments" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>Admin Appointments</Link>
              <Link to="/admin/doctors" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>Admin Doctors</Link>
              <Link to="/admin/patients" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>Admin Patients</Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link to="/my-appointments" className="text-gray-700 hover:text-primary" onClick={() => setMobileNavOpen(false)}>My Appointments</Link>
              <button
                onClick={() => { signOut(); setMobileNavOpen(false); }}
                className="text-left text-red-600 font-medium"
              >
                Sign Out
              </button>
            </>
          )}

          <Link
            to="/book-appointment"
            className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium w-fit"
            onClick={() => setMobileNavOpen(false)}
          >
            Make Appointment
          </Link>
        </nav>
      </div>
    </>
  );
}

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function DoctorLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/doctor" className="font-semibold text-gray-900 text-lg">
                Doctor Portal
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  to="/doctor"
                  className="text-sm font-medium text-gray-600 hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  to="/doctor/appointments"
                  className="text-sm font-medium text-gray-600 hover:text-primary"
                >
                  My Appointments
                </Link>
                <Link
                  to="/doctor/consultations"
                  className="text-sm font-medium text-gray-600 hover:text-primary"
                >
                  My Consultations
                </Link>
                <Link
                  to="/doctor/schedule"
                  className="text-sm font-medium text-gray-600 hover:text-primary"
                >
                  My Schedule
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {profile?.full_name || 'Doctor'}
              </span>
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 hover:text-primary"
              >
                Main site
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

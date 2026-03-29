import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Shared/Layout';
import HealthcareHome from './pages/HealthcareHome';
import About from './pages/About';
import DoctorRizwan from './pages/DoctorRizwan';
import DoctorFaiza from './pages/DoctorFaiza';
import Services from './pages/Services';
import Locations from './pages/Locations';
import OnlineConsultation from './pages/OnlineConsultation';
import HomeVisit from './pages/HomeVisit';
import BookAppointment from './pages/BookAppointment';
import SmartBookAppointment from './pages/SmartBookAppointment';
import PaymentPlaceholder from './pages/PaymentPlaceholder';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import PaymentReturn from './pages/PaymentReturn';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import Emergency from './pages/Emergency';
import AuthPage from './pages/AuthPage';
import AuthCallback from './pages/AuthCallback';
import AdminAppointments from './pages/AdminAppointments';
import AdminDoctors from './pages/AdminDoctors';
import AdminPatients from './pages/AdminPatients';
import MyAppointments from './pages/MyAppointments';
import DoctorLayout from './components/Doctor/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorConsultations from './pages/doctor/DoctorConsultations';
import DoctorConsultationRoom from './pages/doctor/DoctorConsultationRoom';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorSchedule from './pages/doctor/DoctorSchedule';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Layout><HealthcareHome /></Layout>} />
          <Route path="/home" element={<Layout><HealthcareHome /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/doctor/rizwan-shafiq" element={<Layout><DoctorRizwan /></Layout>} />
          <Route path="/doctor/faiza-malik" element={<Layout><DoctorFaiza /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/locations" element={<Layout><Locations /></Layout>} />
          <Route path="/online-consultation" element={<Layout><OnlineConsultation /></Layout>} />
          <Route path="/home-visit" element={<Layout><HomeVisit /></Layout>} />
          <Route path="/book-appointment" element={<ProtectedRoute><Layout><BookAppointment /></Layout></ProtectedRoute>} />
          <Route path="/book-appointment/smart" element={<ProtectedRoute><Layout><SmartBookAppointment /></Layout></ProtectedRoute>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/payment/return" element={<Layout><PaymentReturn /></Layout>} />
          <Route path="/payment/booking" element={<Layout><PaymentPlaceholder /></Layout>} />
          <Route path="/appointment/confirmation" element={<Layout><AppointmentConfirmation /></Layout>} />
          <Route path="/emergency" element={<Layout><Emergency /></Layout>} />

          {/* Auth page (no Layout — uses its own centered layout) */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Logged-in user pages */}
          <Route path="/my-appointments" element={<ProtectedRoute><Layout><MyAppointments /></Layout></ProtectedRoute>} />

          {/* Admin pages — protected, admin only */}
          <Route path="/admin/appointments" element={<ProtectedRoute adminOnly><Layout><AdminAppointments /></Layout></ProtectedRoute>} />
          <Route path="/admin/doctors" element={<ProtectedRoute adminOnly><Layout><AdminDoctors /></Layout></ProtectedRoute>} />
          <Route path="/admin/patients" element={<ProtectedRoute adminOnly><Layout><AdminPatients /></Layout></ProtectedRoute>} />

          {/* Doctor dashboard — protected, doctor only (nested under DoctorLayout) */}
          <Route path="/doctor" element={<ProtectedRoute doctorOnly><DoctorLayout /></ProtectedRoute>}>
            <Route index element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="consultations" element={<DoctorConsultations />} />
            <Route path="consultation/:id" element={<DoctorConsultationRoom />} />
            <Route path="schedule" element={<DoctorSchedule />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

import Navbar from './Navbar';
import Footer from './Footer';
import EmergencyButton from './EmergencyButton';
import WhatsAppFloat from './WhatsAppFloat';

/**
 * Layout wrapper: Navbar + children + Footer + EmergencyButton + WhatsAppFloat
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <EmergencyButton />
      <WhatsAppFloat />
    </div>
  );
}

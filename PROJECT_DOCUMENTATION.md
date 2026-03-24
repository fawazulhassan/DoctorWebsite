# Health & Mind Care Clinic - Project Documentation

## Overview

This is a **React-based healthcare website** for "Health & Mind Care Clinic for Children & Adults" - a dual-specialty clinic providing **Psychiatry** (Dr. Rizwan Shafiq) and **Pediatric** (Dr. Faiza Malik Jabeen) services. The clinic operates in **Lahore** and **Kasur**, Pakistan.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 18.2.0 |
| **Routing** | React Router DOM 6.21.0 |
| **Styling** | Tailwind CSS 3.4.0 |
| **Build Tool** | Vite 5.0.8 |
| **CSS Processing** | PostCSS, Autoprefixer |
| **Backend / DB** | Supabase (appointments) |

### Supabase setup (appointments)

1. Copy `.env.example` to `.env.local` and set:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your project's anon/public key
2. In the Supabase Dashboard → SQL Editor, run the script in `supabase-appointments.sql` to create the `appointments` table and RLS policies.

---

## Project Structure

```
web2/
├── public/
│   └── healthcare-home/      # Images, SVGs, icons
├── src/
│   ├── components/
│   │   ├── Home/             # Home page sections
│   │   └── Shared/           # Reusable components
│   ├── constants/            # Data files (clinic info, doctors, FAQ)
│   ├── pages/                # Route pages
│   ├── utils/                # Utility functions
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## Core Features & Functionality

### 1. Navigation & Layout

#### Navbar (src/components/Shared/Navbar.jsx)
- **Desktop Navigation**: Links to Home, About, Services, Dr. Rizwan, Dr. Faiza, Blog, Contact
- **Mobile Navigation**: Hamburger menu with slide-out panel
- **Logo**: Clickable logo returning to home
- **Search Button**: Visual-only search trigger
- **Call-to-Action**: "Make Appointment" button
- **Sticky Header**: Stays at top on scroll

#### Layout Wrapper (src/components/Shared/Layout.jsx)
Wraps all pages with:
- Navbar
- Main content area
- Footer
- Emergency Button (floating)
- WhatsApp Float (floating)

#### Footer (src/components/Shared/Footer.jsx)
- Clinic logo and description
- Quick links (Home, About, Services, Doctors, Blog, Contact)
- Services links (Online Consultation, Home Visit, Emergency, Payment)
- Newsletter subscription form
- Contact information (Phone, Email, Addresses for Lahore & Kasur)
- Social media links (Facebook, LinkedIn, Instagram)
- Copyright notice

. Floating Action Buttons

#### Emergency---

### 2 Button (src/components/Shared/EmergencyButton.jsx)
- Fixed position (bottom-right)
- Red pulsing animation
- Links to `/emergency` page
- Label: "Emergency Consultation"

#### WhatsApp Float (src/components/Shared/WhatsAppFloat.jsx)
- Fixed position (bottom-left)
- Green WhatsApp icon
- Opens WhatsApp chat with clinic number
- Links to: `https://wa.me/923204310978`

---

### 3. Home Page Sections (Landing Page)

#### Hero Section (src/components/Home/Hero.jsx)
- **Main Headline**: "Mental Health & Pediatric Care for Lahore & Kasur"
- **Subtitle**: Introduction to FCPS-qualified specialists
- **Location Selector**: Toggle between Lahore and Kasur
- **CTA Buttons**: Book Appointment, Online Consultation, Home Visit
- **Statistics Badges**: 50K+ Patients, 10+ Doctors
- **Contact Bar**: Hotline, Emergency Phone, Location, Book Now button
- **Background**: Gradient with wave SVG patterns
- **Doctor Image**: Display of both doctors

#### Values/Why Choose Us (src/components/Home/Values.jsx)
5 key value propositions:
1. **Dual Expertise** - Psychiatry and Paediatrics under one roof
2. **FCPS Qualified** - Highest standards of care
3. **Online Consultation** - Consult from anywhere in Pakistan
4. **Home Visit** - Care at your doorstep (Lahore)
5. **Teamwork** - Collaborative healthcare approach

#### About Section (src/components/Home/AboutSection.jsx)
- Clinic team image
- Doctor badge (hexagonal)
- Quality badge (FCPS Qualified)
- Mission statement
- "Learn More" link to About page

#### Departments/Services (src/components/Home/Departments.jsx)
6 service cards:
1. Psychiatry - Mental health care
2. Pediatric - Child health care
3. Online Consultation - Consult from anywhere
4. Home Visit - Care at your doorstep
5. Emergency - 24/7 availability
6. Follow-up Care - Medication & progress

#### Reviews Section (src/components/Home/Reviews.jsx)
- Patient testimonials carousel
- 3 default reviews with avatars
- Star ratings display
- Quote icons
- Interactive selection buttons

#### CTA Section (src/components/Home/CTASection.jsx)
- Promotional message: "Don't Lose Your Health — Take a Checkup!"
- "Book Now" button
- Doctor/shield imagery

#### Blog Section (src/components/Home/BlogSection.jsx)
- Latest 3 blog posts display
- Category labels
- Date stamps
- Excerpt previews
- "Read More" links

#### Appointment Section (src/components/Home/AppointmentSection.jsx)
- Quick appointment booking form
- Fields: Name, Email, Phone, Department, Doctor, Date, Time, Message
- Doctor image display
- Links to full booking page

#### FAQ Section (src/components/Home/FAQSection.jsx)
- 3 common questions with expandable answers
- Accordion-style interaction

#### Partners Section (src/components/Home/PartnersSection.jsx)
- 8 partner/collaborator logos display
- Grayscale styling

---

### 4. Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HealthcareHome | Landing page |
| `/home` | HealthcareHome | Landing page (duplicate) |
| `/about` | About | About the clinic (Coming Soon) |
| `/doctor/rizwan-shafiq` | DoctorRizwan | Dr. Rizwan's profile & booking |
| `/doctor/faiza-malik` | DoctorFaiza | Dr. Faiza's profile & booking |
| `/services` | Services | All services overview |
| `/locations` | Locations | Lahore & Kasur clinic details |
| `/online-consultation` | OnlineConsultation | How online booking works |
| `/home-visit` | HomeVisit | Home visit service details |
| `/book-appointment` | BookAppointment | Appointment booking form (saves to Supabase) |
| `/contact` | Contact | Contact form & information |
| `/blog` | Blog | Blog listing with categories |
| `/blog/:slug` | BlogPost | Individual blog post |
| `/gallery` | Gallery | Clinic images |
| `/faq` | FAQ | Detailed FAQ by category |
| `/privacy-policy` | PrivacyPolicy | Privacy policy content |
| `/terms` | Terms | Terms & conditions |
| `/payment/return` | PaymentReturn | Payment gateway callback (placeholder) |
| `/appointment/confirmation` | AppointmentConfirmation | Booking confirmation (shows appointment by id) |
| `/emergency` | Emergency | Emergency consultation form |

---

### 5. Key Pages Detail

#### Doctor Profiles (DoctorRizwan.jsx, DoctorFaiza.jsx)

**Dr. Rizwan Shafiq (Psychiatrist)**
- Degrees: M.B.B.S, R.M.P, FCPS Part 2 (Psychiatry)
- Specializations: Depression, Anxiety, OCD, Bipolar, Schizophrenia, Stress, Sleep disorders
- Schedule: Monday (09:00-15:00), Wednesday (10:00-16:00), Friday (08:00-13:00)
- 17 conditions treated (English & Urdu translations)
- Integrated booking form

**Dr. Faiza Malik Jabeen (Pediatrician)**
- Degrees: M.B.B.S, F.C.P.S (Paediatrics)
- Specializations: Child health, vaccination, digestive issues, growth monitoring
- Schedule: Monday (09:00-15:00), Wednesday (10:00-16:00), Friday (08:00-13:00)
- 13 services offered
- Integrated booking form

#### Contact Page (Contact.jsx)
- Contact information display
- Lahore office details
- Kasur clinic details
- Business hours table
- Contact form (Name, Email, Phone, Subject, Message)
- Success message on submit

#### Emergency Page (Emergency.jsx)
- Emergency consultation form
- Fields: Patient Name, Phone, Age, Location, Description, Severity, Doctor, Contact preference
- Submit triggers WhatsApp message
- Success confirmation screen
- 5-minute response promise

#### Online Consultation (OnlineConsultation.jsx)
- 5-step process explanation:
  1. Book your slot
  2. Make payment (JazzCash, EasyPaisa, Bank transfer)
  3. Receive confirmation & meeting link
  4. Join at scheduled time (Zoom, WhatsApp Video, Google Meet)
  5. Get e-prescription
- Platform options display
- Consultation fees (placeholder)
- Privacy & confidentiality assurance

#### Home Visit (HomeVisit.jsx)
- When to book (6 scenarios)
- Areas covered in Lahore (8 areas)
- Zone-based pricing:
  - Green (0-5km): Base charges
  - Yellow (5-10km): Mid-tier
  - Red (10-15km): Maximum
- Charges breakdown
- WhatsApp booking link
- Preparation guidelines

#### Blog (Blog.jsx)
- Category filtering: All, Mental Health, Child Care, General Health
- Search functionality
- 6 blog posts with:
  - Title
  - Category
  - Date
  - Excerpt
  - Image
  - Read More link

#### Blog Post (BlogPost.jsx)
- 6 static articles:
  1. Understanding Depression
  2. Child Vaccination Schedule in Pakistan
  3. Managing Anxiety in Daily Life
  4. Common Childhood Illnesses
  5. Sleep Hygiene for Better Mental Health
  6. Nutrition Tips for Growing Children
- Author attribution
- Category and date
- "Book consultation" CTA
- Back to blog link

#### FAQ (FAQ.jsx)
- 5 categories with expandable questions:
  1. General Questions (5 items)
  2. Appointments (5 items)
  3. Online Consultation (5 items)
  4. Home Visits (5 items)
  5. Payments (4 items)

#### Locations (Locations.jsx)
- Lahore (Harbanspura) details
- Kasur (Daulat Nagar) details
- Home visit coverage areas
- Zone pricing explanation
- Google Maps links

#### Privacy Policy (PrivacyPolicy.jsx)
- Data Collection & Usage
- Patient Confidentiality
- Medical Records Security
- Third-Party Sharing
- Cookie Policy
- Patient Rights
- Contact information

#### Terms (Terms.jsx)
- Service Terms
- User Responsibilities
- Appointment Terms
- Cancellation & Refund Policy
- Telemedicine Consent
- Payment Terms

---

### 6. Reusable Components

#### Button (src/components/Shared/Button.jsx)
- Primary and secondary variants
- Optional icon support (left/right position)
- Customizable className

#### LocationSelector (src/components/Shared/LocationSelector.jsx)
- Toggle between Lahore and Kasur
- Visual state management
- Placeholder component (Phase 1)

#### SectionTitle (src/components/Shared/SectionTitle.jsx)
- Title and subtitle props
- Consistent section heading styling

#### EmergencyButton (src/components/Shared/EmergencyButton.jsx)
- Fixed red pulsing button
- Links to emergency page

#### WhatsAppFloat (src/components/Shared/WhatsAppFloat.jsx)
- Fixed green WhatsApp button
- Direct WhatsApp link

---

### 7. Data Constants

#### Clinic Data (src/constants/clinic.js)
```javascript
{
  name: "Health & Mind Care Clinic for Children & Adults",
  shortName: "Health & Mind Care Clinic",
  phone: "0320-4310978",
  whatsapp: "03204310978",
  email: "faizeerizwan1@gmail.com",
  lahore: { address: "Harbanspura, Lahore", ... },
  kasur: { address: "Near Daulat Nagar, Kasur", ... }
}
```

#### Doctor Conditions (src/constants/doctors.js)
- Dr. Rizwan: 17 mental health conditions (with Urdu translations)
- Dr. Faiza: 13 pediatric services (with Urdu translations)

#### FAQ Data (src/constants/faq.js)
- 5 categories
- 24 total FAQ items

---

### 8. Utility Functions

#### Asset Helper (src/utils/asset.js)
- Returns public path for healthcare-home assets
- Format: `/healthcare-home/{filename}`

---

### 9. Design System

#### Color Palette
- **Primary**: `#307BC4` (Blue)
- **Primary Hover**: Slightly darker blue
- **Emergency**: `#E53E3E` (Red)
- **WhatsApp**: `#25D366` (Green)

#### Typography
- Default font: System fonts via Tailwind
- Headings: Bold, various sizes
- Body: Regular weight, gray tones

#### Components Styling
- Rounded corners (-lg, -2xl)
- Shadows for cards
- Hover effects on interactive elements
- Responsive grid layouts

---

### 10. Features Summary

| Feature | Status |
|---------|--------|
| Responsive Design | ✅ Complete |
| Mobile Navigation | ✅ Complete |
| Multi-location Support | ✅ Complete |
| Doctor Profiles | ✅ Complete |
| Online Consultation Info | ✅ Complete |
| Home Visit Service | ✅ Complete |
| Emergency Consultation | ✅ Complete |
| Blog System | ✅ Complete |
| FAQ System | ✅ Complete |
| Contact Form | ✅ Complete |
| Appointment Booking (UI) | ⚠️ Placeholder |
| Payment Integration | ⚠️ Placeholder |
| Newsletter Subscription | ⚠️ UI Only |
| Search Functionality | ⚠️ UI Only |
| Location State | ⚠️ Placeholder |

---

### 11. External Integrations

- **WhatsApp**: Direct chat link
- **Phone**: Click-to-call links
- **Email**: Mailto links
- **Google Maps**: Location links

---

## Development Notes

1. **Placeholder Components**: Some features like multi-step booking wizard are marked as "Coming Soon"
2. **Location Selector**: Currently visual only, no state propagation
3. **Search**: UI exists but not functional
4. **Newsletter**: Form exists but no backend
5. **Payment**: Return page is placeholder
6. **About Page**: Basic placeholder content

---

## File Count Summary

| Category | Count |
|----------|-------|
| Pages | 18 |
| Home Components | 10 |
| Shared Components | 8 |
| Constants | 3 |
| Utils | 1 |
| Public Assets | ~60 files |

---

*Documentation generated for Health & Mind Care Clinic Project*
*Last Updated: March 2024*

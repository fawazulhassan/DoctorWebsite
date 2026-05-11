# 🏥 Doctor Appointment Web App

A full-stack healthcare web application for booking doctor appointments online. Supports three appointment modes with real-time backend and automated email confirmations. Live at **[doctor-website-liart.vercel.app](https://doctor-website-liart.vercel.app/)**

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-EA4335?style=flat-square&logo=gmail&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 🚀 Live Demo

🔗 [doctor-website-liart.vercel.app](https://doctor-website-liart.vercel.app/)

---

## 📋 Features

### 📅 Three Appointment Modes
- **Clinic Visit** — Book an in-person appointment at the clinic
- **Online Consultation** — Schedule a remote video/call consultation
- **Home Visit** — Request a doctor to visit at your location

### 📝 Patient Booking Forms
- Structured forms with service type selection
- Patient details collection (name, contact, preferred time)
- Form validation for complete and accurate submissions

### 🗄️ Real-Time Backend
- Supabase integration for real-time data storage
- All appointment records stored and managed in the cloud
- Instant data sync across sessions

### 📧 Automated Email Confirmations
- EmailJS integration sends confirmation emails on successful booking
- Patients receive instant booking details via email
- No backend server required for email delivery

### 📱 Responsive UI
- Clean, professional design accessible from any device
- Mobile-friendly layout for easy booking on the go
- Deployed on Vercel with fast global performance

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React.js, JavaScript (ES6+) |
| Styling | CSS3, Responsive Design |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Email | EmailJS |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

## 📦 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) account
- An [EmailJS](https://www.emailjs.com/) account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/fawazulhassan/DoctorWebsite.git
cd DoctorWebsite
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root of the project:
```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

You can find your Supabase keys in your project dashboard under **Settings → API**.
EmailJS keys are available in your [EmailJS dashboard](https://dashboard.emailjs.com/).

**4. Run the development server**
```bash
npm start
```

The app will be running at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```plaintext
DoctorWebsite/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (Clinic, Online, Home Visit)
│   ├── supabase/        # Supabase client setup
│   ├── utils/           # Helper functions
│   └── App.js           # App entry point
├── .env                 # Environment variables (not committed)
└── package.json         # Project dependencies
```

---

## 🔧 Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `REACT_APP_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |

---

## 🚀 Deployment

This project is deployed on **Vercel**.

To deploy your own instance:
1. Push your code to GitHub
2. Import the repo into [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy — Vercel handles the rest automatically

---

## 👨‍💻 Developer

**Muhammad Fawaz ul Hassan**
- 🌐 [portfolio-website-bwxe.vercel.app](https://portfolio-website-bwxe.vercel.app/)
- 💼 [linkedin.com/in/muhammad-fawaz-ul-hassan](https://linkedin.com/in/muhammad-fawaz-ul-hassan/)
- 📧 fawazulhassan@gmail.com

---

## 📄 License

This project is open source and available for learning and reference purposes.
© 2026 Muhammad Fawaz ul Hassan

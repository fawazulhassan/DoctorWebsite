# Page Spec — Healthcare Home (Strict UI Replication)

Based on screenshot analysis. Follow `generic.md` structure.

---

# Section 1 — Screenshot Extraction Checklist

## Identify Layout Pattern

- Navbar + Sections + Footer
- Sidebar + Content
- Split screen
- Centered container
- Grid layout
- Card-based layout
- Mixed layout

**Pattern:** Single-page layout with full-width sections stacked vertically. Content in hero and most sections is in a centered max-width container. Uses two-column splits (text + image), multi-column grids (3–5 columns) for cards, and list/accordion structures.

---

## Identify Sections (Top → Bottom)

List every image and icon per section in Section 10 (including navbar/top bar).

1. SECTION-01: Hero (Header, Top Bars & Main Banner)
2. SECTION-02: Our Values
3. SECTION-03: About Us
4. SECTION-04: Departments (Summary / Icon List)
5. SECTION-05: Departments (Detailed List)
6. SECTION-06: Some Reviews (Testimonials)
7. SECTION-07: CTA Banner ("Don't Let Your Health Take a Backseat")
8. SECTION-08: Latest Update (Blog)
9. SECTION-09: Appointment Form
10. SECTION-10: Usually Asked (FAQ)
11. SECTION-11: Partners / Sponsors (Logos)
12. SECTION-12: Footer

---

## For Each Section Identify

- Background color — see Section 9 per section
- Width — full or constrained (max-w-7xl)
- Padding — section-level and container
- Alignment — left / center / between
- Column structure — 1-col, 2-col, 3/4/5-col grid
- Components inside — see Section 9

---

# Section 2 — Page Metadata


| Field                 | Value                          |
| --------------------- | ------------------------------ |
| Page name             | `healthcare-home`              |
| Route                 | `/`                            |
| Component file        | `src/pages/HealthcareHome.jsx` |
| Spec file name        | `healthcare-home-spec`         |
| Is homepage?          | `true`                         |
| CTA navigation target | `/appointment` (uncertain)     |


---

# Section 3 — Global Layout System

## Base Wrapper

- Full height: `min-h-screen`
- Default flex direction: `flex-col`
- Page background: `#FFFFFF`

---

# Section 4 — Container System

Main content container:

- `max-w-7xl`
- `mx-auto`
- Mobile padding: `px-6`
- Desktop padding: `px-12`

Use this container for all constrained sections.

---

# Section 5 — Responsive System

## Breakpoints

- sm → 640px
- md → 768px
- lg → 1024px
- xl → 1280px

## Rules

- Multi-column layouts collapse to 1 column on mobile
- Grids become single column on small screens
- Padding reduces on mobile
- Top bar / nav becomes hamburger or simplified on small screens
- Text scales proportionally

---

# Section 6 — Typography Tokens


| Token           | Value                                                  |
| --------------- | ------------------------------------------------------ |
| Font family     | `sans-serif` (uncertain — use system or Poppins/Inter) |
| H1 size         | `text-4xl` / `text-5xl` (~36–48px)                     |
| H1 line height  | `leading-tight`                                        |
| H2 size         | `text-3xl` (~30px)                                     |
| Body size       | `text-base` (~16px)                                    |
| Small text size | `text-sm` (~14px)                                      |
| Letter spacing  | `tracking-normal`                                      |


---

# Section 7 — Brand / Color Tokens


| Token                          | Value                                                     |
| ------------------------------ | --------------------------------------------------------- |
| Primary color                  | `#1A73E8`                                                 |
| Primary hover                  | Darker blue (uncertain hex)                               |
| Background color               | `#FFFFFF`                                                 |
| Section alt background         | `#F8F9FA` or `#E0F2F7` (light blue/gray)                  |
| Title text color               | `#2C3E50` / `#333333`                                     |
| Body text color                | `#6C757D`                                                 |
| Border color                   | `#CED4DA` / `#E2E8F0`                                     |
| Link color                     | `#1A73E8`                                                 |
| Light blue gradient (hero/CTA) | `linear-gradient(to right, #E0F2F7, #D0EEF6)` (uncertain) |
| Muted blue (secondary buttons) | `#B0D9E9`                                                 |
| Dark footer blue               | `#1A3A54`                                                 |
| Footer shield blue             | `#66B2FF` (uncertain)                                     |


---

# Section 8 — Spacing System


| Token                      | Default            | Override                                     |
| -------------------------- | ------------------ | -------------------------------------------- |
| Section vertical padding   | `py-16`            | Hero/CTA: `py-20`                            |
| Section mobile padding     | `py-10`            | —                                            |
| Gap between major sections | `space-y-16`       | —                                            |
| Gap inside grids           | `gap-6`            | Department cards: `gap-4`                    |
| Button height              | `h-14` (56px)      | Small: `h-10`                                |
| Border radius              | `rounded-lg` (8px) | Cards: `rounded-xl`; avatars: `rounded-full` |


---

# Section 9 — Section Template (Repeat Per Section)

---

## SECTION-01 — Hero (Header, Top Bars & Main Banner)

### Layout

- Background: Light blue gradient with soft wave-like shapes
- Width: Full width
- Vertical padding: `py-20`
- Horizontal padding: `px-12`
- Alignment: Top bars full width; main content two-column (text left, image right)

### Structure

- Top: Two horizontal bars (dark thin bar, then white bar)
- Main: Two column (~55% text / 45% image)

### Components Inside (Top → Bottom)

1. Dark top bar: notification icon (e.g. "1" in box), more-options icon ("...")
2. White bar: hamburger menu icon (far right)
3. Headline: "Your Partner in Health and Wellness"
4. Sub-headline / description
5. Two CTA buttons (primary dark blue, secondary light blue with border)
6. Stats row: three circular icons with numbers/labels (e.g. "50+", "24/7", "95%")
7. Blue button: "Make Appointment"
8. Hero image: two healthcare professionals (male doctor, female nurse/doctor)

---

## SECTION-02 — Our Values

### Layout

- Background: `#FFFFFF`
- Width: Constrained
- Vertical padding: `py-16`
- Horizontal padding: `px-12`
- Alignment: Center (title), grid (cards)

### Structure

- Grid: 5 cards (e.g. 2–3 columns desktop), collapse on mobile

### Components Inside (Top → Bottom)

1. Section title: "Our Values"
2. Five value cards in grid; each: blue circle icon, bold title, short description — **Compassion**, **Excellence**, **Integrity**, **Respect**, **Teamwork**

---

## SECTION-03 — About Us

### Layout

- Background: `#FFFFFF`
- Width: Constrained
- Vertical padding: `py-16`
- Horizontal padding: `px-12`
- Alignment: Two column (image left, text right)

### Structure

- Two column (~45% image / 55% text)

### Components Inside (Top → Bottom)

1. "About Us" heading; sub-headline (e.g. "PRO HEALTH")
2. Key statement with right-arrow icon (e.g. "ProHealth is a team of experienced medical professionals.")
3. Paragraph about the clinic (holistic healthcare, etc.)
4. Left: main photo (medical setting, patient with mask); shield-shaped overlay with female doctor (white coat, stethoscope, fists raised)
5. Circular badge overlay: "High Quality Professionals" with central checkmark icon (top-center, overlaps photo and text)

---

## SECTION-04 — Departments (Summary / Icon List)

### Layout

- Background: Light blue gradient in rounded container
- Width: Full or constrained
- Vertical padding: `py-10`
- Horizontal padding: `px-12`
- Alignment: Center

### Structure

- Single row: 5 white rounded cards, each with blue outline icon + department label

### Components Inside (Top → Bottom)

1. "Departments" title
2. Five icon + label cards: **Emergency Department**, **Pediatric Department**, **Gynecology Department**, **Cardiology Department**, **Neurology Department**

---

## SECTION-05 — Departments (Awards / Detailed List)

### Layout

- Background: Light or `#F8F9FA`
- Width: Constrained
- Vertical padding: `py-16`
- Horizontal padding: `px-12`
- Alignment: Left (title), grid (cards)

### Structure

- Grid: 4 columns desktop; 4 cards with same icon (blue rounded square, white ribbon + star)

### Components Inside (Top → Bottom)

1. "Departments" title (large, dark blue)
2. Four award/recognition cards; each: same blue square icon (ribbon + star), award title, description paragraph:
  - **Malcolm Baldrige National Quality Award** — excellence in leadership, strategic planning, satisfaction, operational efficiency
  - **HIMSS Davies Award** — health IT to improve patient outcomes and reduce costs
  - **Healthgrades National's Best Hospital** — high ratings for clinical quality and patient safety
  - **Joint Commission Gold Seal of Approval** — rigorous standards for patient safety and quality of care

---

## SECTION-06 — Some Reviews (Testimonials)

### Layout

- Background: `#FFFFFF`
- Width: Constrained
- Vertical padding: `py-16`
- Horizontal padding: `px-12`
- Alignment: Center (title), grid or list (reviews)

### Structure

- Two columns: left = client list (3 rows with avatar, name, location) + vertical timeline/dots; right = highlighted testimonial with quote and stars

### Components Inside (Top → Bottom)

1. "Some Reviews" (large, dark blue); sub-headline "OF OUR CLIENTS" (smaller, blue, uppercase)
2. Left column: three client rows — each with circular avatar, name, location; one row highlighted (soft background); vertical blue line with 3 dots as selector/timeline
3. Right column: large light blue quote icon above testimonial text; 5 blue star rating; testimonial quote (e.g. pediatric / ProHealth care)

---

## SECTION-07 — CTA Banner

### Layout

- Background: Light blue gradient with abstract shapes
- Width: Full width
- Vertical padding: `py-14`
- Horizontal padding: `px-12`
- Alignment: Two column (text left, image right)

### Structure

- Two column; right side = single composite image (doctor + shield in one PNG)

### Components Inside (Top → Bottom)

1. Headline: "Don't Let Your Health Take a Backseat!"
2. Short paragraph (white text)
3. CTA button (white or light)
4. **Single composite image:** female doctor (white coat, stethoscope, fists raised) inside blue shield-shaped frame — one PNG file

---

## SECTION-08 — Latest Update (Blog)

### Layout

- Background: `#FFFFFF`
- Width: Constrained
- Vertical padding: `py-16`
- Horizontal padding: `px-12`
- Alignment: Center (title), grid (cards)

### Structure

- Grid: 3 columns

### Components Inside (Top → Bottom)

1. "Latest Update"; sub-headline "What's New"
2. Three blog cards: featured image, title, short text, date/read time

---

## SECTION-09 — Appointment Form

### Layout

- Background: `#FFFFFF` (right side has light blue abstract shape behind image)
- Width: Constrained
- Vertical padding: `py-16`
- Horizontal padding: `px-12`
- Alignment: Two column (form left, image right)

### Structure

- Two column (~55% form / 45% image)

### Components Inside (Top → Bottom)

1. "Appointment"; sub-headline "Book an Appointment"
2. Form: Name, Email, Phone, Select Department, Select Doctor, Date, Time, Message textarea
3. "Book Appointment" button
4. Male doctor image (smiling, gesturing); light blue decorative curve shape (right column background)
5. Form icons: calendar (Preferred Date), clock (Preferred Time), submit arrow (Submit button)

### Email Confirmation Feature (EmailJS Integration)

When a patient successfully books an appointment, an automated confirmation email is sent to the patient's email address.

#### Technical Implementation

| Component | Details |
|-----------|---------|
| Service | EmailJS (https://dashboard.emailjs.com/admin) |
| Library | `@emailjs/browser` |
| Utility File | `src/utils/email.js` |
| Form Component | `src/components/Shared/BookingForm.jsx` |

#### Environment Variables (`.env.local`)

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

#### Email Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `to_email` | Recipient email (patient) | patient@email.com |
| `patient_name` | Patient's full name | Fawaz Ul Hassan |
| `patient_email` | Patient's email | patient@email.com |
| `patient_phone` | Patient's phone number | 03117819614 |
| `doctor_name` | Doctor's full name | Dr. Rizwan Shafiq |
| `service_type` | Service type | Clinic appointment |
| `location` | City/Location | Lahore |
| `visit_type` | Visit type | Monthly Checkup |
| `appointment_date` | Formatted date | Monday, March 27, 2026 |
| `appointment_time` | Formatted time | 9:00 AM |
| `message` | Patient's message | (optional) |
| `online_platform` | Platform for online consultation | Zoom / Google Meet / WhatsApp |

#### Email Flow

1. Patient fills booking form and submits
2. Data is saved to Supabase `appointments` table
3. If Supabase insert succeeds, confirmation email is sent via EmailJS
4. Email is sent to the patient's email address (`to_email`)
5. User is redirected to confirmation page regardless of email status
6. Email failure does NOT block booking success (non-blocking)

#### Error Handling

- If EmailJS is not configured, booking still succeeds (warning logged)
- If email fails to send, booking still succeeds (error logged)
- All errors are logged to browser console for debugging

---

## SECTION-10 — Usually Asked (FAQ)

### Layout

- Background: `#F8F9FA` or light blue
- Width: Constrained
- Vertical padding: `py-16`
- Horizontal padding: `px-12`
- Alignment: Center (title), left (accordion)

### Structure

- Single column accordion list

### Components Inside (Top → Bottom)

1. "Usually Asked"; sub-headline "Get Your Answers"
2. Accordion items: question + arrow/plus icon; expandable answer (first item "How can I get started?" open by default)

---

## SECTION-11 — Partners / Sponsors

### Layout

- Background: `#FFFFFF`
- Width: Constrained
- Vertical padding: `py-12`
- Horizontal padding: `px-12`
- Alignment: Center

### Structure

- Single row (or two rows on mobile): 8 partner logos

### Components Inside (Top → Bottom)

1. Eight partner/sponsor logos (e.g. MEDICARE, HEALTH, HEALTY, MEDICAL, etc. — grayscale or text)

---

## SECTION-12 — Footer

### Layout

- Background: Dark blue gradient; bottom bar darker blue `#1A3A54`
- Width: Full width
- Vertical padding: `py-12`
- Horizontal padding: `px-12`
- Alignment: Four columns; bottom bar between

### Structure

- Top: large central shield icon with hospital bed symbol; wave separator
- Main: 4 columns (Logo & Contact | Quick Links | Other Links | Newsletter)
- Bottom bar: copyright left, social icons right

### Components Inside (Top → Bottom)

1. Top: optional light blue wavy shape (separator); large central shield (light blue with white medical cross and white rectangular shape)
2. Column 1: logo placeholder, address, phone, email (each with icon)
3. Column 2: "Quick Links" + links (About Us, Services, Departments, Blog, Contact)
4. Column 3: "Other Links" + links (Privacy Policy, Terms, Disclaimer, Careers)
5. Column 4: "Our Newsletter" / "Be Our Subscribers" + email input + Submit button (with right-arrow icon)
6. Bottom bar: copyright text; "Follow Us" + Facebook, LinkedIn, Instagram icons

---

# Section 10 — Assets Required

All assets in: `public/healthcare-home/`  
Reference as: `/healthcare-home/filename.ext`

## Section-by-section asset pass

- Pass 1: Every section above was walked; every image and icon listed below.
- Pass 2: One row per asset in the table.

### Header/Hero (SECTION-01) — checklist

- Logo in navbar (left)
- Dropdown/chevron next to "Pages"
- Search icon (right side)
- Menu / hamburger icon (far right)
- Hero image (single composite: doctors + left 150K+ Patient Recover card + right 870+ Doctors shield — all in one PNG)
- Play button icon (See how we work)
- Contact-strip icons (phone, ambulance, location, button arrow)

---


| #   | Filename                            | Type        | Used In Section                 | Position                                  | Description                                                                                                                                                                                                                                                                                                                 |
| --- | ----------------------------------- | ----------- | ------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `nav-logo.png`                      | Image (PNG) | SECTION-01 Hero / Navbar        | Top left navbar                           | Brand logo mark/wordmark                                                                                                                                                                                                                                                                                                    |
| 2   | `nav-pages-caret.png`               | Image (PNG) | SECTION-01 Hero / Navbar        | Next to Pages link                        | Small down arrow for dropdown menu                                                                                                                                                                                                                                                                                          |
| 3   | `nav-search.svg`                    | SVG         | SECTION-01 Hero / Navbar        | Top right navbar, before hamburger        | Search (magnifying glass) icon                                                                                                                                                                                                                                                                                              |
| 4   | `hamburger-menu.svg`                | SVG         | SECTION-01 Hero / Navbar        | Top right navbar, last icon               | Hamburger menu icon (three lines)                                                                                                                                                                                                                                                                                           |
| 5   | `hero-img-1.png`                    | Image (PNG) | SECTION-01 Hero                 | Right side, full hero visual              | **Single composite image:** female nurse (teal scrubs) + male doctor (white coat); left overlay 150K+ Patient Recover (rounded card with 3 patient avatars + blue checkmark circle); right overlay 870+ Doctors (shield with 1 central + 4 smaller doctor avatars + green status dot). Use this one file as the hero image. |
| 6   | `hero-bg-waves.svg`                 | SVG         | SECTION-01 Hero                 | Background                                | Soft blue gradient/wave shapes (uncertain)                                                                                                                                                                                                                                                                                  |
| 7   | `hero-play.svg`                     | SVG         | SECTION-01 Hero                 | Left of See how we work text              | Circular play button icon                                                                                                                                                                                                                                                                                                   |
| 8   | `contact-phone.svg`                 | SVG         | SECTION-01 Hero                 | Contact strip under hero, left icon       | Phone icon for Hotline                                                                                                                                                                                                                                                                                                      |
| 9   | `contact-ambulance.svg`             | SVG         | SECTION-01 Hero                 | Contact strip under hero, middle icon     | Ambulance icon                                                                                                                                                                                                                                                                                                              |
| 10  | `contact-location.svg`              | SVG         | SECTION-01 Hero                 | Contact strip under hero, third icon      | Location pin icon                                                                                                                                                                                                                                                                                                           |
| 11  | `button-arrow-right.svg`            | SVG         | SECTION-01 Hero                 | Contact strip under hero, Book Now button | Right arrow icon inside button                                                                                                                                                                                                                                                                                              |
| 12  | `value-icon-compassion.png`         | Image (PNG) | SECTION-02 Our Values           | Card 1                                    | Blue circle, white care/connection icon (Compassion)                                                                                                                                                                                                                                                                        |
| 13  | `value-icon-excellence.svg`         | SVG         | SECTION-02 Our Values           | Card 2                                    | Blue circle, white lightbulb icon (Excellence)                                                                                                                                                                                                                                                                              |
| 14  | `value-icon-integrity.svg`          | SVG         | SECTION-02 Our Values           | Card 3                                    | Blue circle, white docs/checkmarks icon (Integrity)                                                                                                                                                                                                                                                                         |
| 15  | `value-icon-respect.png`            | Image (PNG) | SECTION-02 Our Values           | Card 4                                    | Blue circle, white figures/shield icon (Respect)                                                                                                                                                                                                                                                                            |
| 16  | `value-icon-teamwork.png`           | Image (PNG) | SECTION-02 Our Values           | Card 5                                    | Blue circle, white three figures icon (Teamwork)                                                                                                                                                                                                                                                                            |
| 17  | `about-group-masked.png`            | Image (PNG) | SECTION-03 About Us             | Left                                      | Multiple healthcare professionals, one with mask                                                                                                                                                                                                                                                                            |
| 18  | `about-doctor-hex.png`              | Image (PNG) | SECTION-03 About Us             | Overlay on left column, bottom right      | Female doctor in blue shield, white coat, stethoscope, fists raised                                                                                                                                                                                                                                                         |
| 19  | `about-badge-quality.png`           | Image (PNG) | SECTION-03 About Us             | Top-center, overlapping photo and text    | Circular badge "High Quality Professionals", blue border, central blue circle with white checkmark                                                                                                                                                                                                                          |
| 20  | `about-arrow-right.svg`             | SVG         | SECTION-03 About Us             | Right column, before key statement        | Right-arrow icon (→) before "ProHealth is a team..." text                                                                                                                                                                                                                                                                   |
| 21  | `dept-icon-emergency.svg`           | SVG         | SECTION-04 Departments Summary  | Card 1                                    | Blue outline emergency siren (dome + radiating lines) — Emergency Department                                                                                                                                                                                                                                                |
| 22  | `dept-icon-pediatric.svg`           | SVG         | SECTION-04 Departments Summary  | Card 2                                    | Blue outline child head (pigtails, happy face) — Pediatric Department                                                                                                                                                                                                                                                       |
| 23  | `dept-icon-gynecology.svg`          | SVG         | SECTION-04 Departments Summary  | Card 3                                    | Blue outline uterus with fallopian tubes/ovaries — Gynecology Department                                                                                                                                                                                                                                                    |
| 24  | `dept-icon-cardiology.svg`          | SVG         | SECTION-04 Departments Summary  | Card 4                                    | Blue outline anatomical heart — Cardiology Department                                                                                                                                                                                                                                                                       |
| 25  | `dept-icon-neurology.svg`           | SVG         | SECTION-04 Departments Summary  | Card 5                                    | Blue outline neuron (cell body + dendrites) — Neurology Department                                                                                                                                                                                                                                                          |
| 26  | `dept-award-icon.svg`               | SVG         | SECTION-05 Departments Detailed | All 4 cards (reuse same icon)             | Blue rounded square, white outline ribbon with star — award/recognition icon                                                                                                                                                                                                                                                |
| 27  | `review-avatar-1.png`               | Image (PNG) | SECTION-06 Reviews              | Review 1 (left column)                    | Circular profile — e.g. male client (Paulo Hubert)                                                                                                                                                                                                                                                                          |
| 28  | `review-avatar-2.png`               | Image (PNG) | SECTION-06 Reviews              | Review 2 (left column)                    | Circular profile — e.g. female client (Laurence Vendetta)                                                                                                                                                                                                                                                                   |
| 29  | `review-avatar-3.png`               | Image (PNG) | SECTION-06 Reviews              | Review 3 (left column)                    | Circular profile — e.g. female client (Cassandra Raul)                                                                                                                                                                                                                                                                      |
| 30  | `review-star.svg`                   | SVG         | SECTION-06 Reviews              | Right column, with testimonial            | Solid blue star (repeat 5× for rating)                                                                                                                                                                                                                                                                                      |
| 31  | `review-quote-icon.svg`             | SVG         | SECTION-06 Reviews              | Right column, above testimonial text      | Large light blue open-quote / double-quote icon                                                                                                                                                                                                                                                                             |
| 32  | `cta-doctor-shield.png`             | Image (PNG) | SECTION-07 CTA                  | Right side of banner                      | **Single composite:** female doctor (white coat, stethoscope, fists raised) inside blue shield-shaped frame — one PNG                                                                                                                                                                                                       |
| 33  | `blog-image-1.png`                  | Image (PNG) | SECTION-08 Latest Update        | Blog card 1                               | Yoga / wellness                                                                                                                                                                                                                                                                                                             |
| 34  | `cta-bg-curve.png`                  | Image (PNG) | SECTION-07 CTA                  | Left section, decorative                  | lighter blue curve from left; add only if you implement it as a separate graphic.                                                                                                                                                                                                                                           |
| 35  | `blog-image-2.png`                  | Image (PNG) | SECTION-08 Latest Update        | Blog card 2                               | Self-check / awareness                                                                                                                                                                                                                                                                                                      |
| 36  | `blog-image-3.png`                  | Image (PNG) | SECTION-08 Latest Update        | Blog card 3                               | Healthy food                                                                                                                                                                                                                                                                                                                |
| 37  | `appointment-doctor.png`            | Image (PNG) | SECTION-09 Appointment          | Right column                              | Male doctor smiling, gesturing                                                                                                                                                                                                                                                                                              |
| 38  | `appointment-bg-curve.png`          | Image (PNG) | SECTION-09 Appointment          | Right column background                   | Light blue gradient curved shape — organic curve (inverted U / soft wave), decorative background                                                                                                                                                                                                                            |
| 39  | `appointment-icon-calendar.svg`     | SVG         | SECTION-09 Appointment          | Form: Preferred Date field                | Calendar icon beside date input                                                                                                                                                                                                                                                                                             |
| 40  | `appointment-icon-clock.svg`        | SVG         | SECTION-09 Appointment          | Form: Preferred Time field                | Clock icon beside time input                                                                                                                                                                                                                                                                                                |
| 41  | `appointment-icon-submit-arrow.svg` | SVG         | SECTION-09 Appointment          | Submit button                             | Circular arrow icon on Submit / Book Appointment button                                                                                                                                                                                                                                                                     |
| 42  | `faq-arrow-up.svg`                  | SVG         | SECTION-10 FAQ                  | Open accordion item                       | Blue arrow up                                                                                                                                                                                                                                                                                                               |
| 43  | `faq-arrow-down.svg`                | SVG         | SECTION-10 FAQ                  | Closed accordion items                    | Blue arrow down                                                                                                                                                                                                                                                                                                             |
| 44  | `partner-logo-1.svg`                | SVG         | SECTION-11 Partners             | Position 1                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 45  | `partner-logo-2.svg`                | SVG         | SECTION-11 Partners             | Position 2                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 46  | `partner-logo-3.svg`                | SVG         | SECTION-11 Partners             | Position 3                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 47  | `partner-logo-4.svg`                | SVG         | SECTION-11 Partners             | Position 4                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 48  | `partner-logo-5.svg`                | SVG         | SECTION-11 Partners             | Position 5                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 49  | `partner-logo-6.svg`                | SVG         | SECTION-11 Partners             | Position 6                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 50  | `partner-logo-7.svg`                | SVG         | SECTION-11 Partners             | Position 7                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 51  | `partner-logo-8.svg`                | SVG         | SECTION-11 Partners             | Position 8                                | Grayscale/text partner logo                                                                                                                                                                                                                                                                                                 |
| 52  | `footer-shield.svg`                 | SVG         | SECTION-12 Footer               | Top center                                | Light blue shield with white medical cross and white rectangular shape (brand mark)                                                                                                                                                                                                                                         |
| 53  | `footer-bg-wave.svg`                | SVG         | SECTION-12 Footer               | Top of footer                             | Optional: light blue wavy separator above main footer content; add only if implemented as separate graphic.                                                                                                                                                                                                                 |
| 54  | `footer-logo.svg`                   | SVG         | SECTION-12 Footer               | Column 1                                  | Logo (placeholder black rect if none)                                                                                                                                                                                                                                                                                       |
| 55  | `footer-icon-location.svg`          | SVG         | SECTION-12 Footer               | Column 1, contact                         | Location pin                                                                                                                                                                                                                                                                                                                |
| 56  | `footer-icon-phone.svg`             | SVG         | SECTION-12 Footer               | Column 1, contact                         | Phone                                                                                                                                                                                                                                                                                                                       |
| 57  | `footer-icon-email.svg`             | SVG         | SECTION-12 Footer               | Column 1, contact                         | Envelope/email                                                                                                                                                                                                                                                                                                              |
| 58  | `footer-submit-arrow.svg`           | SVG         | SECTION-12 Footer               | Newsletter Submit button                  | White right-pointing arrow inside Subscribe/Submit button                                                                                                                                                                                                                                                                   |
| 59  | `footer-social-facebook.svg`        | SVG         | SECTION-12 Footer               | Bottom bar                                | Facebook                                                                                                                                                                                                                                                                                                                    |
| 60  | `footer-social-linkedin.svg`        | SVG         | SECTION-12 Footer               | Bottom bar                                | LinkedIn                                                                                                                                                                                                                                                                                                                    |
| 61  | `footer-social-instagram.svg`       | SVG         | SECTION-12 Footer               | Bottom bar                                | Instagram                                                                                                                                                                                                                                                                                                                   |


**Count: 62 assets** (13 images/PNG including one composite hero image, 49 icons/SVG). Footer: shield, optional wave, logo, contact icons (location, phone, email), newsletter submit arrow, social (Facebook, LinkedIn, Instagram). Appointment: doctor image, decorative curve (`appointment-bg-curve.png`), form icons (calendar, clock, submit arrow). CTA banner: one composite PNG (`cta-doctor-shield.png`); optional `cta-bg-curve.png`. Reviews: 3 avatars, star icon, quote icon. SECTION-05: 4 award cards, one shared icon `dept-award-icon.svg`. About Us: main photo, shield doctor, circular quality badge, statement arrow. Our Values: 5 cards — Compassion, Excellence, Integrity, Respect, Teamwork. SECTION-01: navbar, hero composite PNG (`hero-img-1.png`), play, contact strip.

---

---

# Section 11 — AI Correction Prompt

If output is incorrect, use:

"Fix layout to match spec exactly. Enforce spacing tokens from Section 8. Maintain section order. Do not redesign."
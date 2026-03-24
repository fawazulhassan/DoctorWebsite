# Page Spec Template — ProHealth About Page (Strict UI Replication Framework)

## Complete Frontend Guide

This template is the **single source of truth** for building the ProHealth About page. Every value below has been extracted directly from the Figma design file (node-id: 25:268). No values have been guessed or approximated.

---

⚠ STRICT MODE:

- Do NOT redesign the UI.
- Do NOT improve spacing.
- Do NOT change component order.
- Do NOT invent new sections.
- Do NOT guess any value — extract or measure from the screenshot/design only.
- Follow this specification exactly.

---

# Section 1 — Screenshot Extraction Checklist

## Identify Layout Pattern

- ✅ Page content sections only (Navbar and Footer are used in shared components one)
- Centered container (max-w: 1440px canvas)

---

## Identify Sections (Top → Bottom)

1. SECTION-01: Hero
2. SECTION-02: Services (Best Services Grid)
3. SECTION-03: Why Choose Us
4. SECTION-04: Stats / Fun Facts Banner
5. SECTION-05: Meet Our Experts (Doctors)
6. SECTION-06: Facilities & Latest Activities (Photo Gallery)
7. SECTION-07: Awards & Recognition
8. SECTION-08: CTA Banner ("Don't Let Your Health Take a Backseat!")

> ⚠️ **Navbar and Footer are shared/global components already developed separately. Do NOT include them in this page build.**

---

## For Each Section:

- Canvas width: `1440px`
- All constrained content uses `max-w-[1296px]` or `max-w-[1295px]` centered

---

# Section 2 — Page Metadata


| Field                 | Value                  |
| --------------------- | ---------------------- |
| Page name             | `about`                |
| Route                 | `/about`               |
| Component file        | `src/pages/About.jsx`  |
| Spec file name        | `prohealth_about_spec` |
| Is homepage?          | `false`                |
| CTA navigation target | `/appointment`         |


---

# Section 3 — Global Layout System

## Base Wrapper

- Full height: `min-h-screen`
- Default flex direction: `flex-col`
- Page background: `#ffffff`

---

# Section 4 — Container System

Main content container:

- `max-w-[1296px]`
- `mx-auto`
- Mobile padding: `px-6`
- Desktop padding: `px-[66px]`

All constrained sections must use this container.

---

# Section 5 — Responsive System

## Breakpoints

- sm → 640px
- md → 768px
- lg → 1024px
- xl → 1280px

## Per-breakpoint behavior


| Breakpoint       | Layout change                  | Padding / spacing | Nav / menu              | Text / assets         |
| ---------------- | ------------------------------ | ----------------- | ----------------------- | --------------------- |
| Default (mobile) | Single column                  | px-4 py-8         | Hamburger menu          | text-base             |
| sm               | Single column                  | px-6 py-10        | Hamburger menu          | text-lg               |
| md               | 2 columns where applicable     | px-8 py-12        | Full nav visible        | text-xl               |
| lg               | 3 columns for services/doctors | px-[66px] py-16   | Full nav with dropdowns | text-2xl for headings |
| xl               | Full 1440px layout as designed | px-[72px] py-16   | Full nav                | text-[52px] for H1    |


---

# Section 6 — Typography Tokens


| Token           | Value                                                  |
| --------------- | ------------------------------------------------------ |
| Font family     | `Inter` (headings), `Poppins` (body/nav)               |
| H1 size         | `text-[52.938px]` / `leading-[63.84px]` (Hero heading) |
| H1 line height  | `63.84px`                                              |
| H2 size         | `text-[51.625px]` / `leading-[63.84px]`                |
| Section label   | `text-[25.289px]` uppercase, `#307bc4`, font-semibold  |
| Card heading    | `text-[24.375px]` / `leading-[34.06px]`, font-bold     |
| Body size       | `text-[16px]` / `leading-[26px]`, Poppins Regular      |
| Small text size | `text-[15.375px]`                                      |
| Stats number    | `text-[51-52px]` / `leading-[63.84px]`, font-bold      |
| Letter spacing  | Normal (no extra letter-spacing detected)              |


---

# Section 7 — Brand / Color Tokens


| Token                  | Value                                    |
| ---------------------- | ---------------------------------------- |
| Primary color          | `#307bc4`                                |
| Primary dark           | `#274760`                                |
| Primary hover          | `#2568a8` (approximate)                  |
| Background color       | `#ffffff`                                |
| Section alt background | Transparent / white                      |
| Title text color       | `#274760`                                |
| Body text color        | `rgba(39, 71, 96, 0.52)`                 |
| Border color           | `rgba(48, 123, 196, 0.5)`                |
| Link color             | `#307bc4`                                |
| Footer bg              | `#307bc4`                                |
| Card shadow            | `0px 4px 21px 1px rgba(48,123,196,0.1)`  |
| Doctor card shadow     | `0px 0px 40px 0px rgba(194,224,240,0.5)` |


---

# Section 8 — Spacing System


| Token                      | Default                            | Override (from design)                             |
| -------------------------- | ---------------------------------- | -------------------------------------------------- |
| Section vertical padding   | `py-16`                            | Hero: no explicit py (full bleed 626px height)     |
| Section mobile padding     | `py-10`                            | —                                                  |
| Gap between major sections | `space-y-16`                       | Services start at top: `718px`                     |
| Gap inside grids           | `gap-6`                            | Services grid gap ~16px                            |
| Button height              | `h-[46px]` (46px)                  | Submit button: `h-[46px]`                          |
| Border radius — cards      | `rounded-[20px]`                   | Service cards: `rounded-[20px]`                    |
| Border radius — gallery    | `rounded-[26-28px]`                | Image gallery: `rounded-[26px]` / `rounded-[28px]` |
| Border radius — stats      | `rounded-[30px]`                   | Stats banner: `rounded-[30px]`                     |
| Border radius — awards     | `rounded-[22px]`                   | Award cards: `rounded-[22px]`                      |
| Icon wrapper               | `w-[40px] h-[40px] rounded-[20px]` | Blue square icon bg                                |


---

# Section 9 — Section Template

---

## SECTION-01 — Hero

> ℹ️ Navbar is a shared component — do not include it in this page.

### Layout

- Background: Full-width decorative background image (`imgFrame10`) with blob/wave overlay shapes
- Width behavior: Full width `1440px`
- Height: `626.48px`
- Content position: Right side — text starts at `left: 720px`
- Alignment: Left-aligned text block on right half

### Structure

- Split layout: Left half = doctor image cutout, Right half = heading + subheading
- Doctor image: `w-[611.23px] h-[516.47px]` absolutely positioned bottom-center-left

### Components Inside

1. Full-bleed background frame with blob decorations
2. Doctor image cutout (absolutely positioned, bottom-aligned)
3. Main heading (H1)
4. Sub-heading

### Exact Copy


| Element    | Exact text                            |
| ---------- | ------------------------------------- |
| H1 line 1  | `Welcome to`                          |
| H1 line 2  | `ProHealth Medical &`                 |
| H1 line 3  | `Healthcare Center`                   |
| Subheading | `Your Partner in Health and Wellness` |


### Buttons


| Button label | Position | Style |
| ------------ | -------- | ----- |
| (none)       | —        | —     |


### Asset Overlay Map


| Asset                    | Size                  | Position                                   | Z-index | Object-fit |
| ------------------------ | --------------------- | ------------------------------------------ | ------- | ---------- |
| `hero-bg.png`            | `w-full h-[626px]`    | `absolute inset-0`                         | 0       | cover      |
| `hero-doctor-cutout.png` | `w-[611px] h-[516px]` | `absolute bottom-0 left-[calc(50%-360px)]` | 10      | contain    |
| Blob shape group 1       | full frame            | `absolute` decorative overlay left         | 5       | —          |
| Blob shape group 2       | full frame            | `absolute` decorative overlay right        | 5       | —          |


---

## SECTION-02 — Services (Provides Our Best Services)

### Layout

- Background color: `#ffffff`
- Width behavior: Constrained `max-w-[1308px]` (`left-[66px] right-[66px]`)
- Top offset: `718px` from page top
- Alignment: Left-aligned heading, 3-column service card grid

### Structure

- Left column: Section label + 2-line heading (spans 1 col)
- Right 2 columns: Service cards in 3-col grid (2 rows)
- Row 1: 3 cards (Diagnostic testing | Treatment for acute and chronic conditions | Rehabilitation services)
- Row 2: 3 cards (Preventive care | Treatment for acute and chronic conditions | Mental health services)

### Components Inside

1. Section label: "SERVICES"
2. Section heading: "Provides Our Best Services"
3. Six service cards (each with: blue icon box, card title, description, bottom-right arrow CTA)

### Exact Copy


| Element            | Exact text                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| Section label      | `SERVICES`                                                                                          |
| Section heading L1 | `Provides Our`                                                                                      |
| Section heading L2 | `Best Services`                                                                                     |
| Card 1 title       | `Diagnostic testing`                                                                                |
| Card 1 body        | `Blood tests, imaging studies, and other tests to diagnose health conditions`                       |
| Card 2 title       | `Rehabilitation services`                                                                           |
| Card 2 body        | `Physical therapy, occupational therapy, and other services to help patients recover from injuries` |
| Card 3 title       | `Preventive care`                                                                                   |
| Card 3 body        | `Annual checkups, immunizations, and health screenings care preventive`                             |
| Card 4 title       | `Treatment for acute and chronic conditions`                                                        |
| Card 4 body        | `Medication management, disease management, and other treatments to improve health outcomes`        |
| Card 5 title       | `Mental health services`                                                                            |
| Card 5 body        | `Counseling, therapy, and other services to help patients manage mental health conditions`          |


### Buttons


| Button label | Position             | Style                            |
| ------------ | -------------------- | -------------------------------- |
| Arrow icon   | Bottom-right of card | `bg-[rgba(48,123,196,0.5)]` pill |


### Component Structure

- **Service Card:** `bg-white`, `rounded-[20px]`, `shadow-[0px_4px_21px_1px_rgba(48,123,196,0.1)]`, `h-[265px]` (or `h-[299px]` for taller card 4), `overflow-clip`
- **Icon wrapper:** `w-[40px] h-[40px] bg-[#307bc4] rounded-[20px]` at `left-[25px] top-[30px]`
- **Icon inside:** `w-[19px] h-[19px]` centered in wrapper
- **Card title:** `left-[25px] top-[108px]`, `font-bold`, `text-[~24px]`, `text-[#274760]`
- **Card body:** `left-[25px]`, `text-[16px]`, `text-[rgba(39,71,96,0.52)]`, `leading-[26px]`
- **Arrow CTA:** `absolute bottom-0 right-0`, `w-[70px] h-[50px]`, `bg-[rgba(48,123,196,0.5)]`, `rounded-tl-[10px] rounded-br-[20px]`
- **Arrow icon inside CTA:** `w-[35px] h-[24px]` centered

---

## SECTION-03 — Why Choose Us

### Layout

- Background color: `#ffffff`
- Width behavior: Full width, constrained inner content
- Top offset: `1376px`
- Alignment: Left = large rounded photo, Right = 2×2 icon-feature grid

### Structure

- Two column: Left `w-[481px]` image, Right feature grid `2×2`
- Right grid: 2 columns × 2 rows of feature blocks

### Components Inside

1. Large rounded photo (`why_choose_us.jpeg`, `w-[481px] h-[644.7px] rounded-[30px]`)
2. Section heading: "Why Choose Us"
3. Four feature blocks (icon + title + body text)

### Exact Copy


| Element         | Exact text                                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section heading | `Why Choose Us`                                                                                                                                            |
| Feature 1 title | `Experienced Medical Professionals`                                                                                                                        |
| Feature 1 body  | `Our team includes experienced doctors, nurses, and other healthcare professionals who are dedicated to providing the best possible care to our patients.` |
| Feature 2 title | `Comprehensive Services`                                                                                                                                   |
| Feature 2 body  | `We offer a wide range of healthcare services, from preventive care to specialized treatment for complex conditions.`                                      |
| Feature 3 title | `Patient-centered Approach`                                                                                                                                |
| Feature 3 body  | `We believe in treating each patient as an individual, and we take the time to understand your unique health needs and concerns.`                          |
| Feature 4 title | `State-of-the-art Facilities`                                                                                                                              |
| Feature 4 body  | `Our healthcare center is equipped with the latest technology and equipment to provide our patients with the most advanced care possible.`                 |


### Buttons


| Button label | Position | Style |
| ------------ | -------- | ----- |
| (none)       | —        | —     |


### Component Structure

- **Feature icon wrapper:** `w-[40px] h-[40px] bg-[#307bc4] rounded-[20px]`
- **Feature icons:** `w-[14-18px] h-[18px]` (varies per icon), centered in wrapper
- **Feature title:** `font-semibold`, `text-[~24.3px]`, `text-[#274760]`, Inter Semi Bold
- **Feature body:** `text-[16px] leading-[26px] text-[rgba(39,71,96,0.52)]` Poppins Regular
- **Grid:** `grid grid-cols-2 gap-x-[385px? unclear—measure]`

---

## SECTION-04 — Stats / Fun Facts Banner

### Layout

- Background: Full-bleed image inside `rounded-[30px]` container
- Width: `w-[1296px]` centered
- Height: `333.83px`
- Top offset: `2112px`
- Alignment: 5 stat blocks evenly distributed horizontally (`justify-between` style)

### Structure

- Single row of 5 stat blocks (number + label stacked, center-aligned)

### Exact Copy


| Element      | Exact text                         |
| ------------ | ---------------------------------- |
| Stat 1 num   | `20+`                              |
| Stat 1 label | `Years of experience`              |
| Stat 2 num   | `95%`                              |
| Stat 2 label | `Patient satisfaction rating`      |
| Stat 3 num   | `5000+`                            |
| Stat 3 label | `Patients served annually`         |
| Stat 4 num   | `10+`                              |
| Stat 4 label | `Healthcare providers on staff`    |
| Stat 5 num   | `22+`                              |
| Stat 5 label | `Convenient locations in the area` |


### Component Structure

- **Container:** `rounded-[30px]` overflow clip, background image fills it (`object-cover`)
- **Stat block:** `text-[#274760] text-center`
- **Number:** `font-bold`, `text-[~51-52px]`, `leading-[63.84px]`, Inter Bold
- **Label:** `text-[16px] leading-[26px]`, Poppins Regular
- **Padding:** `py-[80px]` top/bottom (`top: 80px, bottom: 90px`)

---

## SECTION-05 — Meet Our Experts (Doctors)

### Layout

- Background color: `#ffffff`
- Top offset: `2517px` (label), `2766px` (cards)
- Width: Constrained `left-[66px]`
- Alignment: Center for heading labels; 3-column card layout

### Structure

- Section label + heading (centered)
- 3 doctor cards in a row (each card = white rounded card + circular photo above card top)

### Exact Copy


| Element         | Exact text                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Section label   | `MEET OUR`                                                                                       |
| Section heading | `Experts Doctor`                                                                                 |
| Doctor 1 name   | `Dr. James Lee, MD`                                                                              |
| Doctor 1 title  | `Head of Cardiologist`                                                                           |
| Doctor 1 desc   | `With expertise in managing complex heart conditions and performing advanced cardiac procedures` |
| Doctor 2 name   | `Dr. John Smith, MD`                                                                             |
| Doctor 2 title  | `Emergency Medicine Physician`                                                                   |
| Doctor 2 desc   | `With expertise in treating acute illnesses and injuries in medicine physician`                  |
| Doctor 3 name   | `Dr. Susan Bones, MD`                                                                            |
| Doctor 3 title  | `Board-certified Pediatrician`                                                                   |
| Doctor 3 desc   | `With experience in managing complex medical conditions in children`                             |


### Buttons


| Button label | Position                   | Style                                            |
| ------------ | -------------------------- | ------------------------------------------------ |
| `f` icon     | Bottom of each doctor card | `w-[60px] h-[60px]` circle, `bg-[ellipse2]` blue |
| `in` icon    | Bottom of each doctor card | `w-[60px] h-[60px]` circle, `bg-[ellipse2]` blue |
| Twitter icon | Bottom of each doctor card | `w-[60px] h-[60px]` circle, `bg-[ellipse2]` blue |


### Component Structure

- **Card wrapper:** `bg-white`, `h-[459px] w-[420px]`, `rounded-[20px]`, `shadow-[0px_0px_40px_0px_rgba(194,224,240,0.5)]`, `top-[2766px]`
- **Doctor photo:** `w-[260px] h-[260px]` circular, positioned `142px left of card`, `top-[2624px]` (overlaps card top)
- **Doctor name:** `font-semibold text-[24.29px] text-black`, Inter Semi Bold
- **Doctor title:** `font-normal text-[20px] text-black`, Inter Regular
- **Doctor desc:** `font-normal text-[18px] text-[rgba(0,0,0,0.5)] text-center`
- **Social icons row:** 3 circles `w-[60px] h-[60px]` each with `f`, `in`, Twitter icon (white text on blue circle)

---

## SECTION-06 — Facilities & Latest Activities

### Layout

- Background color: `#ffffff`
- Top offset: `3313px`
- Width: Constrained `left-[68-70px]`
- Alignment: Left heading, asymmetric photo grid (right large + left smaller grid)

### Structure

- Left: Heading + 4-image mosaic grid
- Right: 1 large tall image `w-[520px] h-[581px]`
- Bottom row: 1 wide image `w-[763px] h-[305px]` + 1 `w-[517px] h-[305px]`

### Exact Copy


| Element         | Exact text                             |
| --------------- | -------------------------------------- |
| Section label   | `HAVE A LOOK AT`                       |
| Section heading | `Our Facilities and Latest Activities` |


### Buttons


| Button label | Position | Style |
| ------------ | -------- | ----- |
| (none)       | —        | —     |


### Asset Overlay Map


| Asset        | Size                     | Position                                              | Object-fit |
| ------------ | ------------------------ | ----------------------------------------------------- | ---------- |
| `image1.jpg` | `w-[520px] h-[581px]`    | `absolute right top-[3313px]` `rounded-[26px]`        | cover      |
| `image2.jpg` | `w-[373px] h-[303.74px]` | `absolute left-[68px] top-[3590px]` `rounded-[28px]`  | cover      |
| `image3.jpg` | `w-[373px] h-[303.68px]` | `absolute left-[460px] top-[3591px]` `rounded-[28px]` | cover      |
| `image4.jpg` | `w-[763px] h-[305px]`    | `absolute left-[70px] top-[3908px]` `rounded-[28px]`  | cover      |
| `image5.jpg` | `w-[517px] h-[305px]`    | `absolute left-[855px] top-[3908px]` `rounded-[28px]` | cover      |


---

## SECTION-07 — Awards & Recognition

### Layout

- Background color: `#ffffff`
- Top offset: `4255px`
- Width: Constrained `left-[69px] right: auto`
- Alignment: Centered label + heading + subtitle; 2×2 award card grid

### Structure

- Center-aligned: label, heading (2 lines), subtitle
- 2 columns × 2 rows of award cards (each: `w-[627px] h-[124px]`)

### Exact Copy


| Element        | Exact text                                                                |
| -------------- | ------------------------------------------------------------------------- |
| Section label  | `AWARDS`                                                                  |
| Heading line 1 | `Winning Awards and`                                                      |
| Heading line 2 | `Recognition`                                                             |
| Subtitle       | `We have been recognized for our commitment to excellence in healthcare.` |
| Award 1        | `Malcolm Baldrige National Quality Award`                                 |
| Award 2        | `Healthgrades National's Best Hospital`                                   |
| Award 3        | `Joint Commission Gold Seal of Approval`                                  |
| Award 4        | `HIMSS Davies Award`                                                      |


### Component Structure

- **Award card:** `bg-white`, `h-[124px] w-[627px]`, `rounded-[22px]`, `shadow-[0px_0px_20px_0px_rgba(162,205,240,0.6)]`
- **Icon wrapper inside card:** `bg-[#3d83c8]`, `w-[92px] h-[92px]`, `rounded-[15px]`, positioned `left-[41px]` inside card
- **Award icon:** `w-[42px] h-[50px]`, `object-cover`, centered in blue square
- **Award text:** `font-normal text-[19px] text-black uppercase`, `left-[211px]` (or 886px for right column cards)

---

## SECTION-08 — CTA Banner

### Layout

- Background: Full-bleed image inside rounded container
- Width: `left-[72px] right-[72px]` (`1296px`)
- Height: `679.66px`
- Top offset: `4944px`
- Border radius: `rounded-tl-[30px] rounded-tr-[30px]`
- Alignment: Center

### Structure

- Single centered column: heading + subheading (no buttons visible in design)

### Exact Copy


| Element    | Exact text                                                                         |
| ---------- | ---------------------------------------------------------------------------------- |
| Heading L1 | `Don't Let Your Health`                                                            |
| Heading L2 | `Take a Backseat!`                                                                 |
| Subheading | `Schedule an appointment with one of our experienced medical professionals today!` |


### Buttons


| Button label            | Position | Style |
| ----------------------- | -------- | ----- |
| (none listed in design) | —        | —     |


### Component Structure

- **Heading:** `font-bold text-[53.266px] leading-[63.84px] text-white text-center`, Inter Bold
- **Subheading:** `text-[20px] leading-[30px] text-white text-center`, Poppins Regular
- **Background image:** fills full container, `object-cover`

---

---

# Section 10 — Assets Required

All assets go in: `public/about/`

Reference in React as: `/about/filename.ext`

> ⚠️ Navbar and Footer assets are managed by their own shared components — not listed here.


| #   | Filename                 | Type  | Size (Tailwind)           | Position (exact)                                            | Object-fit | Used In    | Description                        |
| --- | ------------------------ | ----- | ------------------------- | ----------------------------------------------------------- | ---------- | ---------- | ---------------------------------- |
| 1   | `hero-bg.png`            | Image | `w-full h-[626px]`        | `absolute inset-0`                                          | cover      | SECTION-01 | Hero background with blob overlays |
| 2   | `hero-doctor-cutout.png` | Image | `w-[611px] h-[516px]`     | `absolute bottom-0 left-[calc(50%-360px)]`                  | contain    | SECTION-01 | Doctor standing cutout             |
| 3   | `hero-blob-left.png`     | Image | Full frame                | `absolute left-side decorative`                             | —          | SECTION-01 | Decorative blob left               |
| 4   | `hero-blob-right.png`    | Image | Full frame                | `absolute right-side decorative`                            | —          | SECTION-01 | Decorative blob right              |
| 5   | `calendar-white.svg`     | SVG   | `w-[19px] h-[19px]`       | Centered in `w-[40px] h-[40px]` icon wrapper                | contain    | SECTION-02 | Service card icon                  |
| 6   | `arrow-white.svg`        | SVG   | `w-[35px] h-[24px]`       | Centered in `w-[70px] h-[50px]` card arrow CTA              | contain    | SECTION-02 | Card arrow CTA                     |
| 7   | `why-choose-us.jpeg`     | Image | `w-[481px] h-[644.7px]`   | `absolute rounded-[30px]` left side of section              | cover      | SECTION-03 | Doctor/patient photo               |
| 8   | `professional.svg`       | SVG   | `w-[14px] h-[18px]`       | Centered in `w-[40px] h-[40px]` icon wrapper                | contain    | SECTION-03 | Feature 1 — Professional icon      |
| 9   | `comprehensive.svg`      | SVG   | `w-[18px] h-[18px]`       | Centered in icon wrapper                                    | contain    | SECTION-03 | Feature 2 — Comprehensive icon     |
| 10  | `patient.svg`            | SVG   | `w-[18px] h-[18px]`       | Centered in icon wrapper                                    | contain    | SECTION-03 | Feature 3 — Patient-centered icon  |
| 11  | `facilities.svg`         | SVG   | `w-[18px] h-[18px]`       | Centered in icon wrapper                                    | contain    | SECTION-03 | Feature 4 — Facilities icon        |
| 12  | `stats-bg.png`           | Image | `w-[1296px] h-[333.83px]` | `absolute inset-0 rounded-[30px]`                           | cover      | SECTION-04 | Stats banner background            |
| 13  | `doctor-james-lee.png`   | Image | `w-[260px] h-[260px]`     | `absolute left-[146px]` circular, overlaps card top         | cover      | SECTION-05 | Dr. James Lee photo (circular)     |
| 14  | `doctor-john-smith.png`  | Image | `w-[260px] h-[260px]`     | `absolute left-[587px]` circular                            | cover      | SECTION-05 | Dr. John Smith photo (circular)    |
| 15  | `doctor-susan-bones.png` | Image | `w-[260px] h-[260px]`     | `absolute left-[1028px]` circular                           | cover      | SECTION-05 | Dr. Susan Bones photo (circular)   |
| 16  | `social-circle.png`      | Image | `w-[60px] h-[60px]`       | Below each doctor card, 3 per doctor                        | cover      | SECTION-05 | Social icon circle background      |
| 17  | `vector-twitter.svg`     | SVG   | (measure from design)     | `absolute` in social circle                                 | contain    | SECTION-05 | Twitter/X social icon              |
| 18  | `facility-image-1.png`   | Image | `w-[520px] h-[581px]`     | `absolute left-[855px] rounded-[26px]`                      | cover      | SECTION-06 | Large facility photo (right)       |
| 19  | `facility-image-2.png`   | Image | `w-[373px] h-[303px]`     | `absolute left-[68px] rounded-[28px]`                       | cover      | SECTION-06 | Facility photo small (left)        |
| 20  | `facility-image-3.png`   | Image | `w-[373px] h-[303px]`     | `absolute left-[460px] rounded-[28px]`                      | cover      | SECTION-06 | Facility photo small (center)      |
| 21  | `facility-image-4.png`   | Image | `w-[763px] h-[305px]`     | `absolute left-[70px] rounded-[28px]`                       | cover      | SECTION-06 | Wide facility photo (bottom left)  |
| 22  | `facility-image-5.png`   | Image | `w-[517px] h-[305px]`     | `absolute left-[855px] rounded-[28px]`                      | cover      | SECTION-06 | Facility photo (bottom right)      |
| 23  | `award-icon.png`         | Image | `w-[42px] h-[50px]`       | Centered in `bg-[#3d83c8] w-[92px] h-[92px] rounded-[15px]` | cover      | SECTION-07 | Award icon (same for all 4 cards)  |
| 24  | `cta-bg.png`             | Image | `w-full h-[679px]`        | `absolute inset-0 rounded-tl-[30px] rounded-tr-[30px]`      | cover      | SECTION-08 | CTA banner background              |


---

# Section 11 — Build Prompt

Build the **about** page in `About.jsx` using React + Tailwind CSS.

Follow `@prohealth_about_spec.md` strictly.

> ⚠️ **Do NOT include Navbar or Footer — these are shared global components already implemented separately. This component renders only the page body content (SECTION-01 Hero through SECTION-08 CTA).**

Requirements:

- Canvas/frame reference width: `1440px`
- Use layout and section structure exactly as defined.
- Follow container system (`max-w-[1296px]`, `mx-auto`).
- Apply spacing tokens from Section 8.
- Apply typography tokens from Section 6.
- Apply color tokens from Section 7.
- **Fully responsive:** Apply Section 5 breakpoint behavior. Ensure layout, padding, and asset sizes match at each breakpoint.
- Do NOT redesign.
- Do NOT reorder sections.
- Do NOT improve spacing.
- Do NOT guess any value — use only what is specified.

**Strict replication rules:**

- Use **exact copy** from Section 9 "Exact Copy" verbatim.
- Add **only** the buttons listed in Section 9 "Buttons".
- Apply **exact** asset values from Section 10 for each image/icon.
- Section 04 "Why Choose Us": left image is `rounded-[30px]`; right is 2×2 feature grid.
- Section 05 "Doctors": circular photos float above card top edge (negative top offset of ~142px from card).
- Section 06 "Gallery": asymmetric mosaic — large image right, 2 smalls left-center, wide bottom-left, medium bottom-right.

---

# Section 12 — AI Correction Prompt

**For layout issues:**
"Fix layout: Apply exact padding from Section 9 [Section-XX]. Use the exact px values from Section 8, not guessed values."

**For text issues:**
"Fix copy: Use verbatim text from Section 9 Exact Copy table. Do not reword."

**For asset issues:**
"Fix assets: Apply Size, Position, and Object-fit from Section 10."

**For responsive issues:**
"Fix responsive: Apply breakpoint behavior from Section 5."

**General correction:**
"Fix layout to match spec exactly. Use exact copy from Section 9. Apply asset sizes, positions, and object-fit from Section 10. Apply responsive behavior from Section 5. Maintain section order. Do not redesign. Do not guess."

---

# Section 13 — Ambiguity Resolution Protocol


| Scenario                     | Action                                                  |
| ---------------------------- | ------------------------------------------------------- |
| Color unclear                | All hex values confirmed from Figma code — none unclear |
| Size unclear                 | Pixel values extracted from Figma code — use as-is      |
| Font unclear                 | Inter (headings) + Poppins (body) — confirmed from code |
| Two possible interpretations | None identified in this extraction                      |


---

# Section 14 — Component Tree (Complex Sections)

## Hero Section

```
Hero (section, h-626px full-width)
├── BackgroundFrame (w-1440px overflow-clip)
│   ├── BgImage (w-1725px)
│   └── BlobOverlays (Group of 3 decorative mask groups)
├── DoctorCutout (w-611px h-516px, absolute bottom-0)
├── Heading (H1, left-720px, top-320px)
└── Subheading (left-720px, top-456px)
```

> ℹ️ The Navbar rendered inside the Hero frame in Figma is a shared component — do not re-implement it here.

## Doctor Card Section

```
DoctorCard (relative container per doctor)
├── CircularPhoto (w-260px h-260px, absolute top of section — overlaps card)
├── WhiteCard (bg-white, h-459px w-420px, rounded-20px, top-2766px)
│   ├── DoctorName (font-semibold, 24.29px)
│   ├── DoctorTitle (font-normal, 20px)
│   ├── DoctorDesc (18px, rgba 0.5 opacity, text-center)
│   └── SocialIconRow (3 × w-60px h-60px circles: f, in, Twitter)
```

---

# Section 15 — Motion & Animation


| Animation | Trigger | Duration | Easing | Properties                                  |
| --------- | ------- | -------- | ------ | ------------------------------------------- |
| All       | —       | —        | —      | Not shown in static design — assume instant |


---

# Section 16 — Z-Index Scale


| Layer      | Z-Index | Elements in ProHealth About page               |
| ---------- | ------- | ---------------------------------------------- |
| Background | -10     | Hero blob decorative shapes                    |
| Base       | 0       | Section backgrounds, stat banner bg            |
| Elevated   | 10      | Hero doctor cutout, service cards, award cards |
| Floating   | 20      | Doctor circular photos                         |
| Overlay    | 30      | —                                              |
| Navigation | 40      | — (handled by shared Navbar component)         |
| Top        | 50      | —                                              |


---

# Section 17 — Edge Cases & Special Handling


| Scenario           | Rule                                                                            |
| ------------------ | ------------------------------------------------------------------------------- |
| Doctor photos      | Circular photos must overflow above card top — use `overflow-visible` on parent |
| Stats background   | Image fills entire `rounded-[30px]` pill — `overflow: clip` on container        |
| Blob shapes (hero) | Use `mask-image` with `mask-alpha` and `mask-intersect` as in Figma code        |
| CTA section        | `rounded-tl-[30px] rounded-tr-[30px]` only (flat bottom)                        |
| Missing images     | Use placeholder `w-X h-Y bg-gray-200` to preserve layout while assets load      |
| Social icon text   | `f` and `in` text are rendered as actual text characters in white, not SVG      |


---

# Section 18 — Revision History


| Version | Date       | Changes                                                          | Author             |
| ------- | ---------- | ---------------------------------------------------------------- | ------------------ |
| 1.0     | 2026-03-16 | Initial extraction from Figma node 25:268 — ProHealth About page | Claude + Figma MCP |


---

# Section 19 — Common Extraction Notes

1. All pixel values extracted directly from Figma component code — no approximation used
2. Font families confirmed: `Inter` for headings/display, `Poppins` for body/nav
3. All hex colors confirmed from inline styles in Figma output
4. Shadow values extracted verbatim from Figma CSS
5. Asset URLs from Figma expire in 7 days — use for visual reference only during build
6. Some blob/mask shapes use `mask-image` CSS — implement exactly as in Figma-generated code or substitute with SVG file

---

# Section 20 — Spec Completion Checklist

- ✅ Section 1: All 8 page sections identified and ordered (Navbar & Footer excluded — shared components)
- ✅ Section 5: Responsive behavior documented
- ✅ Section 6: All typography tokens extracted from Figma
- ✅ Section 7: All color tokens extracted (hex values)
- ✅ Section 9 (per section): Exact Copy filled verbatim from Figma
- ✅ Section 9 (per section): Buttons table complete
- ✅ Section 10: 24 page-specific assets listed with size, position, object-fit
- ✅ Section 14: Component trees for Hero and Doctor Cards
- ✅ Section 18: Version 1.0 dated


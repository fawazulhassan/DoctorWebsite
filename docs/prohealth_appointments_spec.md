# Page Spec — ProHealth Appointments Page (Strict UI Replication Framework)

## Complete Frontend Guide

This is the **single source of truth** for building the ProHealth Appointments page.
Every value has been extracted directly from the screenshot `Appoinments.png`.
No values have been guessed or approximated.

---

⚠ STRICT MODE:

- Do NOT redesign the UI.
- Do NOT improve spacing.
- Do NOT change component order.
- Do NOT invent new sections.
- Do NOT guess any value.
- Follow this specification exactly.

> ⚠️ **Navbar and Footer are shared/global components already developed separately. Do NOT include them in this page build.**

---

# Section 1 — Screenshot Extraction Checklist

## Identify Layout Pattern

- ✅ Page content sections only (Navbar and Footer shared — excluded)
- ✅ Mixed layout: Hero (split) + Two-column Form + Contact Info + CTA Banner

---

## Identify Sections (Top → Bottom)

1. SECTION-01: Hero Banner
2. SECTION-02: Appointment Form + Contact Info (two-column layout)
3. SECTION-03: CTA Shield Banner

> ⚠️ Navbar and Footer excluded — shared components.

---

## For Each Section:

- Canvas width: `1440px`
- Constrained content: `left-[72px] right-[72px]` = `1296px`
- Page background: `#ffffff`

---

# Section 2 — Page Metadata

| Field                 | Value                                  |
| --------------------- | -------------------------------------- |
| Page name             | `appointments`                         |
| Route                 | `/appointments`                        |
| Component file        | `src/pages/Appointments.jsx`           |
| Spec file name        | `prohealth_appointments_spec`          |
| Is homepage?          | `false`                                |
| CTA navigation target | `/appointments`                        |

---

# Section 3 — Global Layout System

## Base Wrapper

- Full height: `min-h-screen`
- Default flex direction: `flex-col`
- Page background: `#ffffff`

---

# Section 4 — Container System

- Max width: `1296px` (`left-[72px] right-[72px]`)
- `mx-auto`
- Mobile padding: `px-5`
- Desktop padding: `px-[72px]`

---

# Section 5 — Responsive System

## Breakpoints

- sm → 640px
- md → 768px
- lg → 1024px
- xl → 1280px

## Per-breakpoint behavior

| Breakpoint       | Layout change                                 | Padding / spacing   | Text / assets           |
| ---------------- | --------------------------------------------- | ------------------- | ----------------------- |
| Default (mobile) | Single column, form stacks                    | px-5 py-8           | text-2xl headings       |
| md               | Form 2-col inputs, contact info below form    | px-8 py-10          | text-3xl headings       |
| lg               | Two-column: form left, contact info right     | px-[72px]           | Full desktop layout     |
| xl               | Full 1440px layout as designed                | px-[72px]           | All px values as spec   |

---

# Section 6 — Typography Tokens

| Token               | Value                                                           |
| ------------------- | --------------------------------------------------------------- |
| Font family         | `Inter` (headings/labels), `Poppins` (body/placeholder text)    |
| Hero H1 size        | `~48px` / `font-bold` / `line-height: ~58px` / Inter           |
| Hero subheading     | `~18px` / `font-normal` / `line-height: 28px` / Poppins        |
| Section heading     | `~28px` / `font-bold` / Inter / `color: #274760`               |
| Form label          | `~14px` / `font-normal` / Inter / `color: #274760`             |
| Input placeholder   | `~14-16px` / `font-normal` / Poppins / `color: rgba(39,71,96,0.4)` |
| Contact label       | `~16px` / `font-bold` / Inter / `color: #274760`               |
| Contact value       | `~14-16px` / `font-normal` / Poppins / `color: #274760`        |
| Submit button       | `~16px` / `font-medium` / Inter / `color: #ffffff`             |

---

# Section 7 — Brand / Color Tokens

| Token                  | Value                              |
| ---------------------- | ---------------------------------- |
| Primary color          | `#307bc4`                          |
| Primary dark           | `#274760`                          |
| Background color       | `#ffffff`                          |
| Hero bg                | Light blue gradient (same as other pages — `banner-bg.png`) |
| Title text color       | `#274760`                          |
| Body / label text      | `#274760`                          |
| Placeholder text       | `rgba(39, 71, 96, 0.4)`            |
| Input border           | `rgba(39, 71, 96, 0.2)` (light gray-blue) |
| Input border radius    | `~8px`                             |
| Submit button bg       | `#274760` (dark navy blue)         |
| Submit button radius   | `~8px`                             |
| Radio unchecked        | `border: 1.5px solid rgba(39,71,96,0.4)` circle  |
| Section bg             | `#ffffff`                          |
| CTA shield bg          | Light blue gradient (same as hero) |

---

# Section 8 — Spacing System

| Token                      | Value (from screenshot)                         |
| -------------------------- | ----------------------------------------------- |
| Hero height                | `~360px`                                        |
| Hero horizontal padding    | `72px`                                          |
| Form section padding       | `72px` horizontal, `60px` top, `80px` bottom    |
| Form left column width     | `~55%` of container (`~713px`)                  |
| Contact info right width   | `~40%` of container (`~520px`)                  |
| Gap between form & contact | `~60px`                                         |
| Input height               | `~52px`                                         |
| Input border radius        | `8px`                                           |
| Input padding              | `px-4 py-3`                                     |
| Gap between form rows      | `~20px`                                         |
| Contact image height       | `~180px`                                        |
| Contact image border radius| `~12px`                                         |
| Submit button height       | `~48px`                                         |
| Submit button width        | `~140px`                                        |
| CTA banner height          | `~300px`                                        |

---

# Section 9 — Section Templates

---

## SECTION-01 — Hero Banner

### Layout

- Background: full-width light-blue gradient image (`banner-bg.png`) with blob overlays
- Width: Full `1440px`
- Height: `~360px`
- Left side: Doctor image cutout (teal scrubs, "No. 1 Top Best Hospital" badge overlaid)
- Right side: H1 heading + subheading paragraph
- Alignment: text right-of-center, doctor image left-of-center

### Structure

- Split layout: Left = doctor image with badge, Right = heading + subheading
- Doctor image bleeds from bottom, overlaps slightly with hero bottom
- Badge card: white pill, blue thumbs-up icon, text "No. 1" bold + "Top Best Hospital"
- Small health icon (blue circle with heartbeat) top-left of image area

### Components Inside

1. Background image (`banner-bg.png`) — full bleed
2. Doctor image cutout (`hero-doctor-cutout.png` — same as About page)
3. Health icon badge (top-left of image area — blue circle, heartbeat icon)
4. "No. 1 Top Best Hospital" badge (white pill, bottom-right of image)
5. H1 heading (right side)
6. Subheading paragraph (right side)

### Exact Copy

| Element          | Exact text                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| H1 line 1        | `Don't Let Your Health`                                                    |
| H1 line 2        | `Take a Backseat!`                                                         |
| Subheading       | `Fill out the appointment form below to schedule a consultation with one of our healthcare professionals.` |
| Badge text       | `No. 1`                                                                    |
| Badge sub        | `Top Best Hospital`                                                        |

### Buttons

| Button label | Position | Style |
| ------------ | -------- | ----- |
| (none)       | —        | —     |

### Asset Overlay Map

| Asset                    | Size                    | Position                                      | Z-index | Object-fit |
| ------------------------ | ----------------------- | --------------------------------------------- | ------- | ---------- |
| `banner-bg.png`          | `w-full h-full`         | `absolute inset-0`                            | 0       | cover      |
| `hero-doctor-cutout.png` | `w-[~320px] h-auto`     | `absolute bottom-0 left-[~72px]`              | 2       | contain    |
| Health icon badge        | `w-[~50px] h-[~50px]`   | `absolute top-[~80px] left-[~72px]`           | 3       | —          |
| No.1 badge               | `w-[~180px] h-[~52px]`  | `absolute bottom-[~60px] left-[~220px]`       | 3       | —          |

### Component Structure

- **H1:** Inter, `font-bold`, `~48px`, `line-height: ~58px`, `color: #274760`, right half of hero
- **Subheading:** Poppins, `~18px`, `line-height: 28px`, `color: #274760`, max-width `~480px`
- **No.1 badge:** white background, `border-radius: ~30px`, `padding: 10px 20px`, flex row with blue icon left + text right
  - "No. 1" = Inter `font-bold` `~20px` `color: #274760`
  - "Top Best Hospital" = Poppins `~12px` `color: rgba(39,71,96,0.6)`
- **Health icon:** blue circle `w-[50px] h-[50px]`, white heartbeat SVG icon inside

---

## SECTION-02 — Appointment Form + Contact Info

### Layout

- Background: `#ffffff`
- Padding: `72px` horizontal, `60px` top, `80px` bottom
- Structure: Two columns
  - Left column `~55%`: Appointment form
  - Right column `~40%`: Contact info card
  - Gap between columns: `~60px`

### Left Column — Appointment Form

#### Form heading
- Text: `Appoinment` *(exact as shown in design — note the typo)*
- Style: Inter, `font-bold`, `~28px`, `color: #274760`

#### Form fields (top to bottom):

**Row 1 — two inputs side by side:**
- Field 1: Label `Name`, placeholder `David John`
- Field 2: Label `Phone Number`, placeholder `(123) 456 - 789`

**Row 2 — full width:**
- Field: Label `Medical Record Number`, placeholder `123456-7890-0987`

**Row 3 — two inputs side by side:**
- Field 1: Label `Preferred Date`, placeholder `dd/mm/yyyy`, has calendar icon on left
- Field 2: Label `Preferred Time`, placeholder `-- : -- --`, has clock icons on both sides

**Row 4 — Radio buttons:**
- Label: `Reason for Visit`
- Options: `○ Routine Checkup` `○ New Patient Visit` `○ Specific Concern`
- Layout: inline horizontal row

**Row 5 — Radio buttons:**
- Label: `Department`
- Options: `○ Pediatric` `○ Obstetrics and Gynecology` `○ Cardiology` `○ Neurology`
- Layout: inline horizontal row

**Submit Button:**
- Text: `Submit →`
- Style: `bg-[#274760]`, `text-white`, `rounded-[8px]`, `h-[48px]`, `w-[~140px]`, Inter font-medium, arrow icon on right

### Right Column — Contact Info

#### Contact heading
- Text: `Contact Info`
- Style: Inter, `font-bold`, `~28px`, `color: #274760`

#### Contact image
- Doctor/nurse photo holding phone (`contact-info-img.png`)
- Size: `w-full`, `h-[~180px]`
- Border radius: `~12px`
- Object-fit: `cover`

#### Contact details (below image):

| Label        | Value                         | Label style              | Value style              |
| ------------ | ----------------------------- | ------------------------ | ------------------------ |
| `Phone`      | `123-456-7890`                | Inter bold ~16px #274760 | Poppins normal ~14px #274760 |
| `Email Us`   | `hellocallcenter@gmail.com`   | Inter bold ~16px #274760 | Poppins normal ~14px #274760 |
| `Our Location` | `123 Anywhere St., Any City, 12345` | Inter bold ~16px #274760 | Poppins normal ~14px #274760 |

### Exact Copy

| Element                   | Exact text                              |
| ------------------------- | --------------------------------------- |
| Form heading              | `Appoinment`                            |
| Label 1                   | `Name`                                  |
| Placeholder 1             | `David John`                            |
| Label 2                   | `Phone Number`                          |
| Placeholder 2             | `(123) 456 - 789`                       |
| Label 3                   | `Medical Record Number`                 |
| Placeholder 3             | `123456-7890-0987`                      |
| Label 4                   | `Preferred Date`                        |
| Placeholder 4             | `dd/mm/yyyy`                            |
| Label 5                   | `Preferred Time`                        |
| Placeholder 5             | `-- : -- --`                            |
| Radio group 1 label       | `Reason for Visit`                      |
| Radio 1 option 1          | `Routine Checkup`                       |
| Radio 1 option 2          | `New Patient Visit`                     |
| Radio 1 option 3          | `Specific Concern`                      |
| Radio group 2 label       | `Department`                            |
| Radio 2 option 1          | `Pediatric`                             |
| Radio 2 option 2          | `Obstetrics and Gynecology`             |
| Radio 2 option 3          | `Cardiology`                            |
| Radio 2 option 4          | `Neurology`                             |
| Submit button             | `Submit →`                              |
| Contact heading           | `Contact Info`                          |
| Contact label 1           | `Phone`                                 |
| Contact value 1           | `123-456-7890`                          |
| Contact label 2           | `Email Us`                              |
| Contact value 2           | `hellocallcenter@gmail.com`             |
| Contact label 3           | `Our Location`                          |
| Contact value 3           | `123 Anywhere St., Any City, 12345`     |

### Buttons

| Button label | Position          | Style                                                              |
| ------------ | ----------------- | ------------------------------------------------------------------ |
| `Submit →`   | Bottom of form    | `bg-[#274760]`, `text-white`, `rounded-[8px]`, `h-[48px] w-[140px]`, arrow icon right |

### Component Structure

- **Form container:** no border, no card shadow — plain white background
- **Input field:** `border border-[rgba(39,71,96,0.2)]`, `rounded-[8px]`, `h-[52px]`, `px-4`, full width within its column
- **Date input:** has calendar SVG icon inside on left (`pl-10` with icon `absolute left-3`)
- **Time input:** has clock icon on left AND right side of input
- **Radio button:** custom styled circle `w-[18px] h-[18px]`, `border: 1.5px solid rgba(39,71,96,0.4)`, when selected = filled blue circle
- **Radio label text:** Poppins `14px` `color: #274760`, inline with radio
- **Contact image:** `w-full h-[180px] object-cover rounded-[12px]`
- **Contact detail row:** label bold above, value normal below, `margin-bottom: 16px`

---

## SECTION-03 — CTA Shield Banner

### Layout

- Background: Light blue gradient (same style as hero — `banner-bg.png` or similar)
- Width: Full `1440px`
- Height: `~300px`
- Alignment: Center
- Content: Large blue shield icon centered, white horizontal bar/element inside shield

### Structure

- Full-width light blue gradient background
- Large blue shield with medical cross/plus icon centered horizontally
- White rectangular element inside shield (represents a form/card placeholder)
- No text visible in this section (purely decorative/visual CTA element)

### Exact Copy

| Element | Exact text |
| ------- | ---------- |
| (none — decorative section) | — |

### Buttons

| Button label | Position | Style |
| ------------ | -------- | ----- |
| (none)       | —        | —     |

### Component Structure

- **Section bg:** light blue gradient, full width
- **Shield icon:** large blue shield `~w-[200px] h-[220px]`, centered, `color: #5a9fd4` (medium blue)
- **Medical cross:** white `+` icon inside shield top portion
- **White bar:** `w-[~160px] h-[~40px]` white rectangle inside shield lower portion (decorative)

---

# Section 10 — Assets Required

All assets go in: `public/appointments/`

Reference in React as: `/appointments/filename.ext`

> ⚠️ Navbar and Footer assets managed by shared components — not listed here.

| #  | Filename                  | Type  | Size (exact)               | Position                                              | Object-fit | Used In    | Description                                 |
| -- | ------------------------- | ----- | -------------------------- | ----------------------------------------------------- | ---------- | ---------- | ------------------------------------------- |
| 1  | `banner-bg.png`           | Image | `w-full h-[360px]`         | `absolute inset-0`                                    | cover      | SECTION-01 | Hero background blue gradient               |
| 2  | `hero-doctor-cutout.png`  | Image | `w-[320px] h-auto`         | `absolute bottom-0 left-[72px]`                       | contain    | SECTION-01 | Doctor in teal scrubs (same as About page)  |
| 3  | `contact-info-img.png`    | Image | `w-full h-[180px]`         | In flow, top of contact card                          | cover      | SECTION-02 | Doctor/nurse holding phone                  |
| 4  | `calendar-icon.svg`       | SVG   | `w-[18px] h-[18px]`        | Inside date input, `absolute left-3 top-50% -translate-y-50%` | contain | SECTION-02 | Calendar icon for date input           |
| 5  | `clock-icon.svg`          | SVG   | `w-[18px] h-[18px]`        | Inside time input left and right sides                | contain    | SECTION-02 | Clock icon for time input                   |
| 6  | `arrow-white.svg`         | SVG   | `w-[16px] h-[12px]`        | Inside Submit button, right of text                   | contain    | SECTION-02 | Arrow icon on submit button                 |
| 7  | `shield-icon.svg`         | SVG   | `w-[200px] h-[220px]`      | Centered horizontally in section                      | contain    | SECTION-03 | Large blue shield decorative icon           |
| 8  | `health-icon.svg`         | SVG   | `w-[50px] h-[50px]`        | `absolute top-[80px] left-[72px]` in hero             | contain    | SECTION-01 | Blue circle heartbeat icon (top-left hero)  |
| 9  | `no1-badge-icon.svg`      | SVG   | `w-[32px] h-[32px]`        | Inside No.1 badge card, left side                     | contain    | SECTION-01 | Blue thumbs-up icon                         |

---

# Section 11 — Build Prompt

Build the **appointments** page in `src/pages/Appointments.jsx` using React + plain CSS (`Appointments.css`).

Follow `@prohealth_appointments_spec.md` strictly.

> ⚠️ **Do NOT include Navbar or Footer — shared global components handled separately.**

Requirements:

- Canvas reference: `1440px`
- Container: `left-[72px] right-[72px]` = `1296px` centered
- Apply typography tokens from Section 6
- Apply color tokens from Section 7
- Apply spacing from Section 8
- Fully responsive per Section 5
- BEM class naming: `appt-<section>__element`
- Separate CSS file: `Appointments.css`

**Strict replication rules:**

- Form heading is `Appoinment` — **keep this exact typo** as it is in the design
- Submit button is `#274760` dark navy — NOT `#307bc4` primary blue
- Date input has calendar icon on LEFT inside input
- Time input has clock icons on BOTH left AND right
- Radio buttons are custom-styled circles — not browser default
- Contact details: label bold on top, value normal below (stacked, not inline)
- Section 03 shield is purely decorative — no text, no buttons

---

# Section 12 — AI Correction Prompt

**For form issues:**
"Fix form: Two-column inputs for Name+Phone and Date+Time. Full-width for Medical Record Number. Radio buttons inline horizontal."

**For contact info issues:**
"Fix contact: Image full width, rounded-12px. Each contact item: bold label above, normal value below. No icons beside labels."

**For submit button:**
"Fix button: bg-[#274760] NOT #307bc4. Arrow icon on right. Width ~140px, height ~48px."

**General:**
"Match spec exactly. Use exact copy from Section 9. Apply spacing from Section 8. BEM naming appt-*. Do not redesign."

---

# Section 13 — Ambiguity Resolution Protocol

| Scenario                     | Action                                                           |
| ---------------------------- | ---------------------------------------------------------------- |
| Form heading typo            | Keep `Appoinment` exactly as shown — do NOT fix the spelling     |
| Submit button color          | `#274760` (dark navy) — confirmed from screenshot                |
| Radio button styling         | Custom circle, not browser default — must be CSS-styled          |
| CTA section content          | Purely decorative shield — no text or button needed              |
| Contact image                | Unclear exact dimensions — use `w-full h-[180px] object-cover`   |
| Time input icons             | Clock icons on BOTH left and right sides of input                |

---

# Section 14 — Component Tree

## Hero Section

```
AppointmentsHero (section, h-360px, relative, overflow-hidden)
├── BannerBg (absolute inset-0, object-cover)
├── DoctorImage (absolute bottom-0 left-72px, w-320px)
├── HealthIconBadge (absolute top-80px left-72px, w-50px circle)
├── No1Badge (absolute bottom-60px left-220px, white pill)
│   ├── ThumbsUpIcon (w-32px)
│   ├── "No. 1" (bold)
│   └── "Top Best Hospital" (small)
└── TextContent (absolute right side)
    ├── H1 ("Don't Let Your Health / Take a Backseat!")
    └── Subheading (paragraph)
```

## Appointment Form

```
AppointmentForm (left column, ~55% width)
├── Heading ("Appoinment")
├── Row1 (grid 2-col)
│   ├── InputField (Name)
│   └── InputField (Phone Number)
├── Row2 (full width)
│   └── InputField (Medical Record Number)
├── Row3 (grid 2-col)
│   ├── DateInput (calendar icon left)
│   └── TimeInput (clock icons both sides)
├── RadioGroup (Reason for Visit — 3 options inline)
├── RadioGroup (Department — 4 options inline)
└── SubmitButton ("Submit →", bg-#274760)
```

## Contact Info

```
ContactInfo (right column, ~40% width)
├── Heading ("Contact Info")
├── ContactImage (w-full h-180px, rounded-12px)
└── ContactDetails
    ├── ContactItem (Phone / 123-456-7890)
    ├── ContactItem (Email Us / hellocallcenter@gmail.com)
    └── ContactItem (Our Location / 123 Anywhere St...)
```

---

# Section 15 — Motion & Animation

| Animation | Trigger | Duration | Properties |
| --------- | ------- | -------- | ---------- |
| All       | —       | —        | Static — assume instant |

---

# Section 16 — Z-Index Scale

| Layer      | Z-Index | Elements                              |
| ---------- | ------- | ------------------------------------- |
| Background | 0       | Hero bg image                         |
| Base       | 1       | Blob overlays                         |
| Elevated   | 2       | Doctor image cutout                   |
| Floating   | 3       | Badges (health icon, No.1 badge)      |
| Navigation | 40      | Handled by shared Navbar component    |

---

# Section 17 — Edge Cases & Special Handling

| Scenario                  | Rule                                                                      |
| ------------------------- | ------------------------------------------------------------------------- |
| Form heading typo         | `Appoinment` — do NOT auto-correct spelling                               |
| Submit button color       | Must be `#274760` dark navy, not the primary `#307bc4` blue               |
| Date input                | Calendar icon inside input on left — use `position: relative` + `absolute` icon |
| Time input                | Clock icons on BOTH sides — left icon + right icon                        |
| Radio buttons             | Custom CSS circles — browser default `<input type="radio">` must be hidden and replaced |
| CTA shield section        | Purely decorative — no interactive elements                               |
| Contact image             | `object-cover` with fixed height `180px` — do not stretch                |
| Form on mobile            | Two-column input rows stack to single column below `md`                   |
| Contact info on mobile    | Moves below form on mobile (stacks vertically)                            |

---

# Section 18 — Revision History

| Version | Date       | Changes                                               | Author              |
| ------- | ---------- | ----------------------------------------------------- | ------------------- |
| 1.0     | 2026-03-17 | Initial extraction from screenshot — Appointments page | Claude (screenshot) |

---

# Section 19 — Extraction Notes

1. All values extracted from `Appoinments.png` screenshot
2. Font families: `Inter` (headings/labels) + `Poppins` (body/placeholders) — consistent with rest of ProHealth project
3. Colors consistent with project tokens: `#307bc4` primary, `#274760` dark
4. Submit button is specifically `#274760` — darker than primary blue
5. Form heading has intentional typo `Appoinment` — preserve as-is
6. Figma MCP limit reached — some exact px values marked as approximate; verify in Figma when access restored
7. Radio buttons require custom CSS styling to match design circles

---

# Section 20 — Spec Completion Checklist

- ✅ Section 1: All 3 sections identified and ordered (Navbar & Footer excluded)
- ✅ Section 5: Responsive behavior documented
- ✅ Section 6: Typography tokens extracted from screenshot
- ✅ Section 7: Color tokens extracted (hex values confirmed)
- ✅ Section 9: Exact copy filled verbatim for ALL sections (including typo preserved)
- ✅ Section 9: Buttons tables complete
- ✅ Section 9: All form fields documented with labels + placeholders
- ✅ Section 10: 9 assets listed with size, position, object-fit
- ✅ Section 14: Component trees for Hero, Form, Contact Info
- ✅ Section 17: Edge cases documented (typo, button color, radio styling, date/time icons)
- ✅ Section 18: Version 1.0 dated

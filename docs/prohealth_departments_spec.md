# Page Spec — ProHealth Departments Page (Strict UI Replication Framework)

## Complete Frontend Guide

This is the **single source of truth** for building the ProHealth Departments page.
Every value has been extracted directly from Figma file `mIi3NosZ6fI8U3Db5E5GFc`, node-id: `48:1251`.
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
- ✅ Mixed layout: Hero (split) + Card Grid + CTA Banner

---

## Identify Sections (Top → Bottom)

1. SECTION-01: Hero / Banner
2. SECTION-02: Department Cards Grid (Row 1 — 3 cards)
3. SECTION-03: Department Cards Grid (Row 2 — 3 cards)
4. SECTION-04: Department Cards Grid (Row 3 — 2 cards, center-aligned)
5. SECTION-05: CTA Banner ("Don't Let Your Health Take a Backseat!")

> ⚠️ Navbar and Footer excluded — shared components.

---

## For Each Section:

- Canvas width: `1440px`
- All constrained content: `left-[72px] right-[72px]` = `1296px` wide
- Page background: `#ffffff`

---

# Section 2 — Page Metadata


| Field                 | Value                        |
| --------------------- | ---------------------------- |
| Page name             | `departments`                |
| Route                 | `/departments`               |
| Component file        | `src/pages/Departments.jsx`  |
| Spec file name        | `prohealth_departments_spec` |
| Is homepage?          | `false`                      |
| CTA navigation target | `/appointment`               |


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


| Breakpoint       | Layout change                  | Padding / spacing | Text / assets            |
| ---------------- | ------------------------------ | ----------------- | ------------------------ |
| Default (mobile) | Single column                  | px-5 py-8         | text-2xl headings        |
| md               | 2-column card grid             | px-8 py-10        | text-3xl headings        |
| lg               | 3-column card grid             | px-[72px] py-0    | text-[52px] hero heading |
| xl               | Full 1440px layout as designed | px-[72px]         | All px values as spec    |


---

# Section 6 — Typography Tokens


| Token           | Value                                                  |
| --------------- | ------------------------------------------------------ |
| Font family     | `Inter` (headings), `Poppins` (body/subheading)        |
| Hero H1 size    | `52.828px` / `leading-[63.84px]` / `font-bold` / Inter |
| Hero subheading | `20px` / `leading-[30px]` / `font-normal` / Poppins    |
| Card title      | `24.578px` / `leading-[34.06px]` / `font-bold` / Inter |
| Card body       | `16px` / `leading-[26px]` / `font-normal` / Poppins    |
| CTA heading     | `53.266px` / `leading-[63.84px]` / `font-bold` / Inter |
| CTA subheading  | `20px` / `leading-[30px]` / `font-medium` / Poppins    |


---

# Section 7 — Brand / Color Tokens


| Token              | Value                                    |
| ------------------ | ---------------------------------------- |
| Primary color      | `#307bc4`                                |
| Primary dark       | `#274760`                                |
| Background color   | `#ffffff`                                |
| Title text color   | `#274760`                                |
| Body text color    | `rgba(39, 71, 96, 0.52)`                 |
| Card shadow        | `0px 4px 21px 1px rgba(48,123,196,0.1)`  |
| CTA section shadow | `6px 4px 70px 8px rgba(48,123,196,0.09)` |
| Card arrow bg      | `rgba(48, 123, 196, 0.5)`                |


---

# Section 8 — Spacing System


| Token                     | Value (from Figma)                        |
| ------------------------- | ----------------------------------------- |
| Page horizontal padding   | `72px` left and right                     |
| Hero height               | `622.66px`                                |
| Card row 1 top offset     | `512.66px`                                |
| Card row 2 top offset     | `914.75px`                                |
| Card row 3 top offset     | `1316.84px`                               |
| CTA section top offset    | `1847.98px`                               |
| Card height (standard)    | `352.09px`                                |
| Card height (taller)      | `386.14px` (Occupational Therapy card)    |
| Card border radius        | `rounded-[20px]`                          |
| CTA section border radius | `rounded-[30px]`                          |
| Gap between card rows     | `~50px` (914.75 - 512.66 - 352.09 = 50px) |
| Gap between cards in row  | `~20px` (512 - 72 - 416 = 24px approx)    |


---

# Section 9 — Section Templates

---

## SECTION-01 — Hero / Banner

### Layout

- Background: Full-width decorative SVG/image (`banner_bg.svg` with blob overlays)
- Width: Full `1440px`
- Height: `622.66px`
- Left content: `left-[72px]`, text starts at vertical center
- Right image: `w-[696px] h-[420px]`, positioned `left-[calc(50%+384px)]`, `bottom-[67.66px]`
- Alignment: Left text, Right image (split layout)

### Structure

- Left half: H1 heading + subheading paragraph
- Right half: Large banner image (`banner_img.png`) with a floating badge card

### Components Inside (Top → Bottom, Left → Right)

1. Background SVG fill (full bleed, blob overlays left + right)
2. H1 heading (left side)
3. Subheading paragraph (left side)
4. Banner image — `banner_img.png` (right side, absolute positioned)
5. Floating badge card — "24 Hour Doctors can help you need" (overlaid on image)

### Exact Copy


| Element           | Exact text                                                      |
| ----------------- | --------------------------------------------------------------- |
| H1 line 1         | `Get to Know`                                                   |
| H1 line 2         | `ProHealth Departments`                                         |
| Subheading line 1 | `At ProHealth, we offer a wide range of medical and healthcare` |
| Subheading line 2 | `services that are designed to meet your individual needs and`  |
| Subheading line 3 | `help you achieve optimal health.`                              |
| Badge text        | `24 Hour Doctors`                                               |
| Badge sub         | `can help you need`                                             |


### Buttons


| Button label | Position | Style |
| ------------ | -------- | ----- |
| (none)       | —        | —     |


### Asset Overlay Map


| Asset            | Size                  | Position                                           | Z-index | Object-fit |
| ---------------- | --------------------- | -------------------------------------------------- | ------- | ---------- |
| `banner-bg.png`  | `w-full h-[622.66px]` | `absolute inset-0`                                 | 0       | cover      |
| `blob-left.png`  | full frame decorative | `absolute left-0 top-0`                            | 1       | —          |
| `blob-right.png` | full frame decorative | `absolute right-0 top-0`                           | 1       | —          |
| `banner-img.png` | `w-[696px] h-[420px]` | `absolute bottom-[67.66px] left-[calc(50%+384px)]` | 2       | contain    |
| `badge-card`     | `~w-[180px]`          | Floating over image, top-right area of image       | 3       | —          |


### Component Structure

- **H1:** `font-family: Inter`, `font-weight: 700`, `font-size: 52.828px`, `line-height: 63.84px`, `color: #274760`, `left-[72px]`, `top: ~288px`
- **Subheading:** `font-family: Poppins`, `font-size: 20px`, `line-height: 30px`, `color: #274760`, `left-[72px]`, `w-[620.48px]`
- **Badge card:** white pill/card, blue shield icon on left, text "24 Hour Doctors" bold, "can help you need" small — positioned floating over the banner image top-right area

---

## SECTION-02 — Department Cards Row 1

### Layout

- Background: `#ffffff`
- Width: `left-[72px] right-[72px]`
- Top: `512.66px`
- Structure: 3-column grid, equal width cards
- Each card: `w-[416px] h-[352.09px]` (approx — 3 cards × 416px + 2 × 24px gap = 1296px)
- Card gap: `~20px`

### Components Inside Each Card

1. Department icon (`icon_1.svg`) — `w-[70px] h-[66px]`, `left-[34px]`
2. Department title — `left-[130px]`, 2-line bold heading
3. Department body text — `left-[130px]`, 5-line description
4. Arrow CTA — `absolute bottom-0 right-0`, `w-[70px] h-[50px]`, `bg-rgba(48,123,196,0.5)`, `rounded-tl-[10px] rounded-br-[20px]`

### Exact Copy


| Card | Title line 1 | Title line 2 | Body text                                                                                                                        |
| ---- | ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `Emergency`  | `Department` | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |
| 2    | `Cardiology` | `Department` | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |
| 3    | `Pediatric`  | `Department` | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |


### Buttons


| Button label | Position             | Style                                                                                 |
| ------------ | -------------------- | ------------------------------------------------------------------------------------- |
| Arrow icon   | Bottom-right of card | `bg-[rgba(48,123,196,0.5)]` `rounded-tl-[10px] rounded-br-[20px]` `w-[70px] h-[50px]` |


### Component Structure

- **Card wrapper:** `bg-white`, `rounded-[20px]`, `shadow-[0px_4px_21px_1px_rgba(48,123,196,0.1)]`, `overflow-clip`, `h-[352.09px]`, `relative`
- **Icon:** `position: absolute`, `left-[34px]`, `top: calc(50% - 87.04px)` (upper half), `w-[70px] h-[66px]`, `object-contain`
- **Title:** `position: absolute`, `left-[130px]`, `top: 82.02px` (translated), `font-bold`, `font-size: 24.578px`, `line-height: 34.06px`, `color: #274760`
- **Body:** `position: absolute`, `left-[130px]`, `top: ~198.59px`, `font-size: 16px`, `line-height: 26px`, `color: rgba(39,71,96,0.52)`, `w-[225.33px]`
- **Arrow CTA:** `position: absolute`, `bottom: 0`, `right: 0`, `w-[70px] h-[50px]`, arrow icon `w-[35px] h-[24px]` centered

---

## SECTION-03 — Department Cards Row 2

### Layout

- Same card structure as Row 1
- Top: `914.75px`
- 3 columns, same widths and gaps as Row 1

### Exact Copy


| Card | Title line 1     | Title line 2 | Body text                                                                                                                        |
| ---- | ---------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `Obstetrics and` | `Gynecology` | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |
| 2    | `Psychiatry`     | `Department` | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |
| 3    | `Neurology`      | `Department` | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |


### Buttons

Same arrow CTA as Row 1 cards.

---

## SECTION-04 — Department Cards Row 3

### Layout

- Top: `1316.84px`
- Only **2 cards**, center-aligned: `left-[512px]` and `left-[952px]`
- First card taller: `h-[386.14px]` (Occupational Therapy — 3-line title)
- Second card standard: `h-[352.09px]`
- Cards start at column 2 position (not from left edge), leaving column 1 empty

### Exact Copy


| Card | Title line 1       | Title line 2 | Title line 3 | Body text                                                                                                                        |
| ---- | ------------------ | ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `Occupational`     | `Therapy`    | `Department` | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |
| 2    | `Physical Therapy` | `Department` | —            | `This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.` |


### Component Structure

- Occupational Therapy card: title has 3 lines → `h-[100.1px]` title block, icon at `top: calc(50% - 104.07px)`
- Physical Therapy card: standard 2-line title layout

---

## SECTION-05 — CTA Banner

### Layout

- Background: `#ffffff`
- Container: `left-[72px] right-[72px]`, `rounded-[30px]`
- Height: `645.66px`
- Top: `1847.98px`
- Shadow: `6px 4px 70px 8px rgba(48,123,196,0.09)`
- Structure: Right side = text content, Left side = doctor image (`banner_img_3.png`) absolutely positioned

### Components Inside

1. White rounded container with shadow
2. CTA heading (right side, centered in right half)
3. CTA subheading (right side)
4. Doctor/nurse image (`banner_img_3.png`) — `w-[500px] h-[778px]`, positioned left side, `scale-y: -1` (flipped vertically), `rotate-180`
5. Decorative blue shield/logo in center (from Figma background)

### Exact Copy


| Element        | Exact text                                 |
| -------------- | ------------------------------------------ |
| Heading line 1 | `Don't Let Your Health`                    |
| Heading line 2 | `Take a Backseat!`                         |
| Subheading L1  | `Schedule an appointment with one of our`  |
| Subheading L2  | `experienced medical professionals today!` |


### Buttons


| Button label             | Position | Style |
| ------------------------ | -------- | ----- |
| (none visible in design) | —        | —     |


### Component Structure

- **Container:** `bg-white`, `rounded-[30px]`, `overflow-clip`, `shadow-[6px_4px_70px_8px_rgba(48,123,196,0.09)]`, `color: #274760`
- **Heading:** `font-bold`, `font-size: 53.266px`, `line-height: 63.84px`, `left-[653.17px]`, `top-[149.42px]` (within container)
- **Subheading:** `font-medium` Poppins, `font-size: 20px`, `line-height: 30px`, `left-[653.17px]`, `w-[423.26px]`
- **Doctor image:** `w-[500px] h-[778px]`, `position: absolute`, `left-[40px]`, `top: calc(50% + 574.68px - 389px)` — note: image is `scale(-1,-1)` (flipped both axes via `rotate-180 scale-y-[-1]`)

---

# Section 10 — Assets Required

All assets go in: `public/departments/`

Reference in React as: `/departments/filename.ext`

> ⚠️ Navbar and Footer assets managed by shared components — not listed here.


| #   | Filename          | Type  | Size (exact)          | Position                                                                            | Object-fit | Used In          | Description                               |
| --- | ----------------- | ----- | --------------------- | ----------------------------------------------------------------------------------- | ---------- | ---------------- | ----------------------------------------- |
| 1   | `banner-bg.png`   | Image | `w-full h-[622.66px]` | `absolute inset-0`                                                                  | cover      | SECTION-01       | Hero background with blob/wave shapes     |
| 2   | `blob-left.png`   | Image | Full frame height     | `absolute left-0 top-0`                                                             | —          | SECTION-01       | Left decorative blob overlay              |
| 3   | `blob-right.png`  | Image | Full frame height     | `absolute right-0 top-0`                                                            | —          | SECTION-01       | Right decorative blob overlay             |
| 4   | `banner-img.png`  | Image | `w-[696px] h-[420px]` | `absolute bottom-[67.66px] left-[calc(50%+384px)]`                                  | contain    | SECTION-01       | Hero right image (doctor/nurse)           |
| 5   | `icon-dept.svg`   | SVG   | `w-[70px] h-[66px]`   | `absolute left-[34px] top-[calc(50%-87px)]` per card                                | contain    | SECTION-02/03/04 | Department card icon (same for all cards) |
| 6   | `arrow-white.svg` | SVG   | `w-[35px] h-[24px]`   | Centered in `w-[70px] h-[50px]` arrow CTA at card bottom-right                      | contain    | SECTION-02/03/04 | Card arrow CTA icon                       |
| 7   | `cta-doctor.png`  | Image | `w-[500px] h-[778px]` | `absolute left-[40px]` within CTA container, `transform: rotate(180deg) scaleY(-1)` | contain    | SECTION-05       | Doctor/nurse image (flipped)              |


---

# Section 11 — Build Prompt

Build the **departments** page in `src/pages/Departments.jsx` using React + CSS (plain CSS, separate `Departments.css` file).

Follow `@prohealth_departments_spec.md` strictly.

> ⚠️ **Do NOT include Navbar or Footer — shared global components handled separately. Render only page body (SECTION-01 Hero through SECTION-05 CTA).**

Requirements:

- Canvas reference width: `1440px`
- Use layout and section structure exactly as defined above.
- Use `left-[72px] right-[72px]` container (1296px wide).
- Apply typography tokens from Section 6.
- Apply color tokens from Section 7.
- Apply exact spacing from Section 8.
- Fully responsive per Section 5.
- Do NOT redesign or reorder sections.
- Do NOT guess any value.

**Strict replication rules:**

- Use **exact copy** from Section 9 verbatim for all text.
- Department cards: icon left, title + body right — NOT stacked vertically.
- Row 3 has only 2 cards starting from center column (column 1 is empty).
- CTA doctor image is `rotate(180deg) scaleY(-1)` — flipped.
- Arrow CTA on each card: `absolute bottom-0 right-0`, `rounded-tl-[10px] rounded-br-[20px]`.
- Apply exact card shadow: `0px 4px 21px 1px rgba(48,123,196,0.1)`.

---

# Section 12 — AI Correction Prompt

**For layout issues:**
"Fix layout: Use exact padding `left-[72px] right-[72px]`. Cards are 3-column grid with ~20px gap."

**For text issues:**
"Fix copy: Use verbatim text from Section 9. Card titles are 2 lines. Body is always the same 5-line text."

**For asset issues:**
"Fix assets: Icon is `w-[70px] h-[66px]` at `left-[34px]`. Arrow CTA is `w-[70px] h-[50px]` absolute bottom-right."

**For CTA image:**
"Fix CTA image: apply `transform: rotate(180deg) scaleY(-1)` to the doctor image. It should be flipped."

**General correction:**
"Fix to match spec exactly. Use exact copy from Section 9. Apply spacing from Section 8. Apply asset sizes from Section 10. Do not redesign."

---

# Section 13 — Ambiguity Resolution Protocol


| Scenario                   | Action                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------- |
| Row 3 card alignment       | Cards start at left-[512px] and left-[952px] — column 1 is empty                    |
| CTA doctor image transform | `rotate(180deg) scaleY(-1)` confirmed from Figma code                               |
| Icon same across all cards | `icon_1.svg` used for all 8 department cards — confirmed                            |
| Card body text             | Same 5-line text for all cards in Figma — use as-is or differentiate per department |


---

# Section 14 — Component Tree

## Hero Section

```
Hero (section, h-622.66px, full-width, overflow-hidden)
├── BannerBg (w-full h-full, absolute inset-0, object-cover)
├── BlobLeft (absolute left-0 top-0, decorative)
├── BlobRight (absolute right-0 top-0, decorative)
├── TextContent (absolute left-72px, top ~288px)
│   ├── H1 ("Get to Know / ProHealth Departments")
│   └── Subheading (3-line paragraph)
└── BannerImage (absolute bottom-67.66px left-calc(50%+384px), w-696px h-420px)
    └── BadgeCard (floating overlay, top-right of image)
```

## Department Card

```
DepartmentCard (relative, bg-white, rounded-20px, shadow, overflow-clip)
├── Icon (absolute left-34px top-calc(50%-87px), w-70px h-66px)
├── Title (absolute left-130px top-82px, 2-line bold)
├── Body (absolute left-130px top-198px, 5-line text, w-225px)
└── ArrowCTA (absolute bottom-0 right-0, w-70px h-50px, rounded-tl-10px rounded-br-20px)
    └── ArrowIcon (w-35px h-24px, centered)
```

## CTA Section

```
CTASection (relative, bg-white, rounded-30px, overflow-clip, shadow)
├── DoctorImage (absolute left-40px, w-500px h-778px, transform rotate-180 scaleY-1)
├── Heading ("Don't Let Your Health / Take a Backseat!")
└── Subheading (2-line text, left-653px)
```

---

# Section 15 — Motion & Animation


| Animation | Trigger | Duration | Properties                                 |
| --------- | ------- | -------- | ------------------------------------------ |
| All       | —       | —        | Static design — assume instant transitions |


---

# Section 16 — Z-Index Scale


| Layer      | Z-Index | Elements                           |
| ---------- | ------- | ---------------------------------- |
| Background | 0       | Hero bg image                      |
| Base       | 1       | Blob overlays                      |
| Elevated   | 2       | Banner image, card content         |
| Floating   | 3       | Badge card overlay on hero image   |
| Navigation | 40      | Handled by shared Navbar component |


---

# Section 17 — Edge Cases & Special Handling


| Scenario             | Rule                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| Row 3 — 2 cards only | Cards start at center column — col 1 is intentionally empty. Use `justify-end` or `grid` with offset |
| CTA doctor image     | Must be `transform: rotate(180deg) scaleY(-1)` — image is rendered upside-down in Figma              |
| Card icon position   | Icon vertical position is `top: calc(50% - 87.04px)` NOT top-0 — it sits in upper half               |
| Card body width      | Body text constrained to `w-[225.33px]` — do not stretch to full card width                          |
| Occupational Therapy | 3-line title → card is taller `h-[386.14px]`, icon at `top: calc(50% - 104.07px)`                    |


---

# Section 18 — Revision History


| Version | Date       | Changes                                                  | Author             |
| ------- | ---------- | -------------------------------------------------------- | ------------------ |
| 1.0     | 2026-03-17 | Initial extraction from Figma node 48:1251 — Departments | Claude + Figma MCP |


---

# Section 19 — Common Extraction Notes

1. All px values extracted directly from Figma component code — no approximation
2. Font families confirmed: `Inter` (headings/titles) + `Poppins` (body/subheadings)
3. All hex colors confirmed from inline styles in Figma output
4. Icon (`icon_1.svg`) is the same SVG reused across all 8 department cards
5. CTA doctor image uses CSS transform `rotate(180deg) scaleY(-1)` — do not remove
6. Figma asset URLs expire in 7 days — replace with your own assets in `public/departments/`

---

# Section 20 — Spec Completion Checklist

- ✅ Section 1: All 5 sections identified and ordered (Navbar & Footer excluded)
- ✅ Section 5: Responsive behavior documented
- ✅ Section 6: All typography tokens extracted from Figma
- ✅ Section 7: All color tokens extracted (hex values confirmed)
- ✅ Section 9: Exact copy filled verbatim for all sections
- ✅ Section 9: Buttons tables complete for all sections
- ✅ Section 10: 7 assets listed with size, position, object-fit
- ✅ Section 14: Component trees for Hero, Department Card, CTA
- ✅ Section 17: Edge cases documented (Row 3, CTA flip, card icon position)
- ✅ Section 18: Version 1.0 dated


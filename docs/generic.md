# Page Spec Template — Full Website (Strict UI Replication Framework)

## Complete Frontend Guide

This template is the **single source of truth** for building a page. When you fill it from a screenshot and then build from the resulting spec:

- You get a **complete frontend**: every section, component, and asset is defined.
- Use **dummy/placeholder data** where real content or APIs are not available (e.g. placeholder copy, sample images, mock list items, fake testimonials, sample form values) so the page is fully visible and functional.
- Do not leave sections empty or "coming soon"; populate with placeholder content so the layout and behavior can be verified end-to-end.

**Extraction rule — no guessing:** Every value in this spec (colors, sizes, positions, spacing, copy, asset dimensions) must be **extracted from the screenshot or design** you are given. Measure, count, or read the exact values. Do NOT guess, approximate, or invent. If you cannot see a value clearly, note "unclear — confirm from design" and do not fill a guess.

**To minimize post-build fixes:** Fill Section 9 "Exact Copy" and "Buttons" for every section; add **exact** asset Size, Position, and Object-fit in Section 10; use "Component Structure" and "Asset overlay map" for complex layouts (footer, forms, hero, about). This reduces text mismatches, wrong button placement, and incorrect icon/image sizes and positions.

---

⚠ STRICT MODE:
- Do NOT redesign the UI.
- Do NOT improve spacing.
- Do NOT change component order.
- Do NOT invent new sections.
- Do NOT guess any value — extract or measure from the screenshot/design only.
- Follow this specification exactly.
- If something is unclear, ask instead of guessing.

---

# Section 1 — Screenshot Extraction Checklist

Carefully inspect the screenshot before filling anything. **Extract only what you see;** do not assume or guess.

## Identify Layout Pattern

- [ ] Navbar + Sections + Footer
- [ ] Sidebar + Content
- [ ] Split screen
- [ ] Centered container
- [ ] Grid layout
- [ ] Card-based layout
- [ ] Mixed layout

---

## Identify Sections (Top → Bottom)

List all major visible sections in order. **When you later list assets (Section 10), list every image and icon in each section**, including the navbar (logo, dropdowns, search, menu).

1. SECTION-01: {{ name }}
2. SECTION-02: {{ name }}
3. SECTION-03: {{ name }}
4. SECTION-04: {{ name }}
5. SECTION-05: {{ name }}

(Add/remove as needed)

---

## For Each Section Identify (extract exact values from screenshot):

- Background color (hex or Tailwind class if identifiable)
- Width (full / constrained; if constrained, note max width in px or Tailwind)
- Padding top/bottom and left/right (e.g. py-16 px-6, or note px values)
- Alignment (left / center / between)
- Column structure (e.g. 50/50, 1/3–2/3, grid columns)
- Components inside (list every visible element)
- Responsive behavior (e.g. "stacks to 1 column below lg", "padding halves on mobile")

---

# Section 2 — Page Metadata

| Field | Value |
|---|---|
| Page name | `{{ page_name }}` |
| Route | `{{ page_route }}` |
| Component file | `src/{{ component_file }}` |
| Spec file name | `{{ spec_file_name }}` |
| Is homepage? | `{{ is_homepage }}` |
| CTA navigation target | `{{ navigates_to }}` |

---

# Section 3 — Global Layout System

## Base Wrapper

- Full height: `min-h-screen`
- Default flex direction: `flex-col`
- Page background: `{{ page_bg }}`

---

# Section 4 — Container System

Main content container:

- `max-w-7xl`
- `mx-auto`
- Mobile padding: `px-6`
- Desktop padding: `px-12`

All constrained sections must use this container.

---

# Section 5 — Responsive System

**Extract from screenshot:** If the screenshot shows multiple viewports (e.g. mobile + desktop), document the exact behavior at each. Otherwise specify expected behavior per breakpoint; do not guess — align with Section 9 "Responsive adjustments" per section.

## Breakpoints

- sm → 640px
- md → 768px
- lg → 1024px
- xl → 1280px

## Per-breakpoint behavior (fill from screenshot or design)

| Breakpoint | Layout change | Padding / spacing | Nav / menu | Text / assets |
|------------|---------------|-------------------|------------|---------------|
| Default (mobile) | {{ e.g. single column }} | {{ e.g. px-4 py-8 }} | {{ e.g. hamburger }} | {{ e.g. text-base }} |
| sm | {{ describe }} | {{ describe }} | {{ describe }} | {{ describe }} |
| md | {{ describe }} | {{ describe }} | {{ describe }} | {{ describe }} |
| lg | {{ describe }} | {{ describe }} | {{ describe }} | {{ describe }} |
| xl | {{ describe }} | {{ describe }} | {{ describe }} | {{ describe }} |

## Rules (apply exactly; do not invent)

- Multi-column layouts: document at which breakpoint they collapse to 1 column (e.g. "lg:grid-cols-2, default grid-cols-1").
- Grids: note column count per breakpoint (e.g. "md:grid-cols-2, lg:grid-cols-3").
- Padding: use Section 8 tokens; document any section-specific override (e.g. "Hero: py-10 md:py-16").
- Navigation: document when hamburger appears (e.g. "below md").
- Text: use Section 6 tokens; document responsive sizes if visible (e.g. "text-2xl md:text-4xl" for H1).
- Images/assets: document responsive size overrides in Section 10 "Size (responsive)" where they change by breakpoint.

---

# Section 6 — Typography Tokens

**Extract from screenshot:** Identify font sizes and line heights as they appear (e.g. via dev tools or design file). Do not guess.

| Token | Value |
|---|---|
| Font family | `{{ font_family }}` |
| H1 size | `{{ h1_size }}` (e.g. text-4xl md:text-5xl) |
| H1 line height | `{{ h1_line_height }}` |
| H2 size | `{{ h2_size }}` |
| Body size | `{{ body_size }}` |
| Small text size | `{{ small_text_size }}` |
| Letter spacing | `{{ letter_spacing }}` |

All headings and text must follow these tokens. Specify responsive sizes if they change at breakpoints (e.g. H1: text-2xl md:text-4xl).

---

# Section 7 — Brand / Color Tokens

**Extract from screenshot:** Use eyedropper or dev tools to get exact hex/rgb values from the design. Do not guess.

| Token | Value |
|---|---|
| Primary color | `{{ primary_color }}` (hex or Tailwind) |
| Primary hover | `{{ primary_color_dark }}` |
| Background color | `{{ page_bg }}` |
| Section alt background | `{{ section_alt_bg }}` |
| Title text color | `{{ title_color }}` |
| Body text color | `{{ body_color }}` |
| Border color | `{{ border_color }}` |
| Link color | `{{ link_color }}` |

---

# Section 8 — Spacing System

**Extract from screenshot where visible:** Note padding and gaps as they appear; use defaults only if not clearly visible.

| Token | Default | Override (from screenshot if different) |
|---|---|---|
| Section vertical padding | `py-16` | `{{ override }}` |
| Section mobile padding | `py-10` | `{{ override }}` |
| Gap between major sections | `space-y-16` | `{{ override }}` |
| Gap inside grids | `gap-6` | `{{ override }}` |
| Button height | `h-14` (56px) | `{{ override }}` |
| Border radius | `rounded-lg` (8px) | `{{ override }}` |

All sections must respect this spacing system. Document section-specific overrides in Section 9 (e.g. "Hero: py-12 md:py-24").

---

# Section 9 — Section Template (Repeat Per Section)

Copy this block for each section identified.

---

## SECTION-XX — {{ section_name }}

**Extract all values below from the screenshot.** Do not guess layout, padding, or structure.

### Layout (exact values from screenshot)
- Background color: `{{ bg_color }}` (hex or Tailwind — must match screenshot)
- Width behavior:
  - [ ] Full width
  - [ ] Constrained (`max-w-7xl` or specify exact max)
- Vertical padding: `{{ py_value }}` (e.g. py-16; measure if needed)
- Horizontal padding: `{{ px_value }}` (e.g. px-6 lg:px-12)
- Alignment: left / center / between
- Responsive adjustments: {{ describe exactly — e.g. "At md, grid becomes 2 cols; at sm padding is py-8" }}

---

### Structure (exact from screenshot)
- [ ] Single column
- [ ] Two column (50/50 or custom ratio — specify e.g. 1fr 1fr or 40% 60%)
- [ ] Three column
- [ ] Grid (how many columns? — specify e.g. 3 cols, gap-6)

Grid behavior on mobile:
{{ describe exactly — e.g. "Below lg: 1 column; gap-4" }}

---

### Components Inside (Top → Bottom)

1. {{ component_name }}
2. {{ component_name }}
3. {{ component_name }}

---

### Exact Copy (extract from screenshot — use this text exactly; do not paraphrase)

List **exact visible text** for this section as it appears in the screenshot. The build must use these strings verbatim. Do not reword or guess.

| Element | Exact text |
|---------|------------|
| Section heading | `{{ exact_heading }}` |
| Sub-heading | `{{ exact_subheading }}` |
| Button labels | `{{ exact_button_labels }}` |
| Links / nav items | `{{ exact_links }}` |
| Placeholder text | `{{ exact_placeholders }}` |

(Add rows as needed. Leave blank if section has no such element.)

---

### Buttons (explicit list — do not add any other buttons)

| Button label | Position | Style |
|--------------|----------|-------|
| {{ label }} | {{ where }} | Primary / Secondary / Outline |
| {{ label }} | {{ where }} | Primary / Secondary / Outline |

**Rule:** Add ONLY buttons listed here. Do NOT add buttons to cards, sections, or CTAs unless explicitly listed.

---

### Component Structure (for complex sections only)

If this section has combined elements (e.g. input+button, icon+text rows), describe layout rules **exactly as in the screenshot**:

- **{{ element_name }}:** {{ layout_rule }} (e.g. "Input and button form one combined element: input rounded-left, button rounded-right; no gap between them")
- **{{ icon_element }}:** {{ size_and_position }} (e.g. "Circular bg w-7 h-7, icon w-4 h-4 inside")

(Skip if section is simple.)

---

### Asset overlay map (for sections with overlapping images/badges — e.g. Hero, About)

If this section has a main image with overlaid badges, icons, or secondary images, list **each overlay** with exact placement from the screenshot. Do not guess positions.

| Asset (filename) | Size (Tailwind) | Position (CSS/Tailwind) | Z-index | Object-fit |
|------------------|-----------------|--------------------------|--------|------------|
| {{ e.g. badge.png }} | `w-24 h-24` | `absolute top-4 right-4` | 10 | contain |
| {{ e.g. doctor-cutout.png }} | `w-48 h-auto` | `absolute -bottom-6 -right-4` | 5 | contain |

**Position format:** Use Tailwind or CSS (e.g. `absolute top-0 right-0`, `absolute bottom-4 left-1/2 -translate-x-1/2`). Specify units if needed (e.g. `top-[1rem]`).

---

# Section 10 — Assets Required

All assets go in:

public/{{ page_name }}/

Reference in React as:

/{{ page_name }}/filename.ext

## Extraction rule — no guessing

For **every** asset row below you must:

1. **Size (Tailwind):** Derive from the screenshot (e.g. compare to text size, container width, or measure in design/dev tools). Use exact Tailwind classes (e.g. `w-10 h-10`, `max-w-lg`, `w-full h-48`). Do NOT leave as placeholder or guess.
2. **Position:** If the asset is absolutely positioned or in a specific place, specify exact placement (e.g. `absolute top-4 right-4`, or "in flow, first child of card").
3. **Object-fit:** For images that fill a box, specify `object-cover`, `object-contain`, or `object-none` as in the screenshot.
4. **Responsive:** If the asset size or position changes at a breakpoint, add the override (e.g. "md:w-12 md:h-12").

If you cannot measure precisely, note "measure from design" and do not invent a value.

## Section-by-section asset pass (do not skip)

To avoid missing any asset:

1. **Pass 1 — By section:** For each section you listed in Section 1 (and Section 9), go through that section in the screenshot and list every image and icon (photos, logos, icons, dropdowns, buttons, cards, footer, etc.).
2. **Pass 2 — Fill table:** Add one row in the table below for each asset from Pass 1. Fill **every** column from the screenshot; no empty Size or Position.

### Header/Navbar (SECTION-01) — checklist

Before closing Section 10, confirm every navbar asset is in the table:

- [ ] Logo (main mark and/or wordmark)
- [ ] Dropdown/chevron icon next to any nav item that has a dropdown (e.g. "Pages")
- [ ] Search icon
- [ ] Menu/hamburger icon
- [ ] Any other image or icon in the navbar (e.g. CTA button icon)

---

### Footer (last section) — checklist

If the page has a footer, confirm every footer asset is in the table:

- [ ] Top decorative icon (shield, logo, wave)
- [ ] Column 1 logo (if present)
- [ ] Contact icons (location, phone, email — list each)
- [ ] Newsletter/subscribe form: submit button arrow icon
- [ ] Social icons (list each: Facebook, LinkedIn, Instagram, Twitter, etc.)
- [ ] No extra icons or buttons

---

### Forms / CTAs — checklist

If the page has forms or CTA banners:

- [ ] Input field icons (calendar, clock, etc.)
- [ ] Submit button icon (arrow, checkmark)
- [ ] CTA button icon (if any)

---

For EACH visual asset detected in the screenshot, list it below. **Extract Size and Position from the screenshot;** do not guess.

| # | Filename | Type | Size (Tailwind) | Size (responsive) | Position (exact) | Object-fit | Used In Section | Description |
|---|----------|------|-----------------|-------------------|------------------|------------|-----------------|--------------|
| 1 | {{ filename }} | Image / SVG | `w-X h-Y` or `max-w-X` | {{ e.g. md:w-Y md:h-Y }} | `absolute top-X right-Y` or "in flow" | cover / contain | {{ section }} | {{ what_it_represents }} |
| 2 | {{ filename }} | Image / SVG | `w-X h-Y` or `max-w-X` | {{ if different on breakpoints }} | {{ exact placement }} | cover / contain | {{ section }} | {{ what_it_represents }} |
| 3 | {{ filename }} | Image / SVG | `w-X h-Y` or `max-w-X` | {{ optional }} | {{ exact placement }} | cover / contain | {{ section }} | {{ what_it_represents }} |

**Column rules:**

- **Size (Tailwind):** Exact classes from screenshot (e.g. `w-28 h-auto`, `w-4 h-4`, `max-w-lg h-64`). For icons inside a circle, specify both circle and icon (e.g. "wrapper: w-10 h-10 rounded-full; icon: w-5 h-5").
- **Size (responsive):** Optional override per breakpoint (e.g. `md:w-12 md:h-12`, `max-w-full md:max-w-xl`).
- **Position (exact):** Tailwind or CSS that reproduces the screenshot (e.g. `absolute -top-2 right-4`, `absolute bottom-0 left-0`, or "relative, first in flex container"). For overlays, use same format as Section 9 "Asset overlay map".
- **Object-fit:** For `<img>`: `object-cover` (crop to fill), `object-contain` (fit inside), or `object-none`. Must match how the image appears in the screenshot.

## Asset Naming Rules

- Use lowercase
- Use hyphen-case
- Be descriptive but short
- Format:
  - hero-image.png
  - feature-icon-1.svg
  - product-card-image.png
  - testimonial-avatar-1.png

Instructions:
- Count ALL images and icons visible in the screenshot.
- Include navbar icons, button icons, decorative SVGs, and background images.
- Do not miss small icons inside inputs or cards.
- For each row: fill Size (Tailwind), Position (exact), and Object-fit from the screenshot. Do not leave blank or guess.
- If you cannot determine a value from the screenshot, note "unclear — measure from design" and do not invent a value.
- If something is ambiguous (e.g. icon vs background shape), mark as "uncertain" and still provide best-effort size/position from what is visible.

---

# Section 11 — Build Prompt

Copy after filling all placeholders:

---

Build the **{{ page_name }}** page in `src/{{ component_file }}` using React + Tailwind CSS.

Follow `@{{ spec_file_name }}.md` strictly.

Requirements:

- Use layout and section structure exactly as defined.
- Follow container system (max-w-7xl, mx-auto).
- Apply spacing tokens from Section 8.
- Apply typography tokens from Section 6.
- Apply color tokens from Section 7.
- **Fully responsive:** Apply Section 5 breakpoint behavior; use responsive classes (e.g. md:, lg:) as specified in Section 5 and Section 9. Ensure layout, padding, and asset sizes match at each breakpoint.
- Do NOT redesign.
- Do NOT reorder sections.
- Do NOT improve spacing.
- Do NOT guess any value — use only what is specified in the spec.

**Strict replication rules:**

- Use **exact copy** from Section 9 "Exact Copy" for all headings, subheadings, button labels, nav links, footer text, placeholders. Do NOT paraphrase or invent.
- Add **only** the buttons listed in Section 9 "Buttons" table. Do NOT add buttons to cards, sections, or CTAs unless explicitly listed.
- Apply **exact** asset values from Section 10 for each image/icon:
  - **Size (Tailwind):** Use the specified classes (e.g. `w-28 h-auto`, `w-4 h-4`). Apply **Size (responsive)** overrides when provided.
  - **Position (exact):** Use the specified placement (e.g. `absolute top-4 right-4`). Do not guess position.
  - **Object-fit:** Use the specified value on `<img>` (e.g. `object-cover`, `object-contain`).
- For sections with overlays, follow Section 9 "Asset overlay map" and Section 10 positions exactly.
- For combined elements (e.g. input+button), follow Section 9 "Component Structure" exactly — no gaps, correct border-radius.
- **Responsive:** Apply Section 5 breakpoint behavior and any section-specific responsive adjustments from Section 9. Use responsive size overrides from Section 10 for assets.

**Complete frontend with dummy data:**

- Use **placeholder or dummy data** for any content not in "Exact Copy" (lists, testimonials, blog posts, form labels) so the page is fully populated and usable.
- Use **placeholder images** (e.g. from Section 10 filenames, or a consistent placeholder service) where real assets are not yet available, so every section renders and layout can be verified.
- Ensure every section from the spec is implemented and visible; no empty or "coming soon" blocks.

Assets:
All assets are inside `public/{{ page_name }}/`
Use `/{{ page_name }}/filename.ext`

Routing:
Register route in `App.jsx` for `{{ page_route }}`.

Export component as default.

---

# Section 12 — AI Correction Prompt

If output is incorrect, use:

"Fix layout to match spec exactly. Use exact copy from Section 9. Apply asset sizes, positions, and object-fit from Section 10. Apply responsive behavior from Section 5 and Section 9. Add only listed buttons. Follow Component Structure and Asset overlay map for combined/overlay sections. Enforce spacing tokens from Section 8. Maintain section order. Do not redesign. Do not guess — use only values specified in the spec."
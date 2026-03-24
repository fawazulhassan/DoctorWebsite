# Frontend Development Rules (React)

This document defines the **standard rules and structure for building frontend pages in React**.
These rules ensure **clean code, scalability, responsiveness, and AI-friendly development**.

The goal is to make development **consistent and easy to maintain**, while also allowing **AI tools like Cursor to generate better code**.

## Quick Start Checklist

When creating a **new page**:

- Create `pages/<PageName>.js` (or `.jsx` / `.tsx`)
- Create `components/<PageName>/` folder with section components (each with own `.css`)
- Add `public/<pageName>/` folder for page-specific assets
- Use BEM naming: `<page>-<section>__element`
- Use Tailwind for layout/responsiveness, CSS for animations/complex styling
- Include `loading` and `error` states if fetching data
- Test responsive: mobile → tablet → desktop
- Verify accessibility: semantic HTML, alt texts, keyboard navigation

---

## When Working on an Existing Project

If the project **already has its own folder structure** (different from Section 1):

- **Do NOT** change or force the structure from this document.
- **Follow the project's existing structure** — where pages, components, and assets live.
- **Still apply** the coding rules from this document:
  - BEM-style class names (Section 4) — *unless* the project uses CSS Modules, Styled Components, or another system; then follow their conventions
  - Tailwind for responsiveness (Section 5) — if the project uses Tailwind
  - Component rules: one component per section, own CSS file (Section 3)
  - Hooks pattern with loading/error (Section 9)
  - Accessibility basics (Section 8)
  - Clean code rules (Section 10)

Use this document as a **code style guide**, not a structure override when the project is already set up differently.

---

# 1. Project Folder Structure

## For New Projects (Greenfield)

All new frontend pages must follow this structure:

```
src
│
├── pages
│   │
│   │    Home.js
│   │    About.js
│   │    Contact.js
│
│
├── components
│   │
│   ├── Home
│   │   │
│   │   ├── Hero.js
│   │   ├── Hero.css
│   │   │
│   │   ├── Services.js
│   │   ├── Services.css
│   │   │
│   │   ├── Testimonials.js
│   │   ├── Testimonials.css
│   │
│   │
│   ├── About
│   │   │
│   │   ├── AboutIntro.js
│   │   ├── AboutIntro.css
│   │   │
│   │   ├── Team.js
│   │   ├── Team.css
│   │
│   │
│   ├── Shared
│   │   │
│   │   ├── Modal.js
│   │   ├── Modal.css
│   │   │
│   │   ├── Layout.js
│   │   └── Layout.css
│
│
├── hooks
│   ├── useToggle.js
│   ├── useFetch.js
│
│
├── styles
│   ├── global.css
│
│
└── App.js
```

### Key Principles

1. Each **page has its own component folder**.
2. Components of different pages **must never mix**.
3. Each component has its **own CSS file**.
4. Pages only **import components**, they do not contain UI logic.
5. React components use `.js` (or `.jsx` / `.tsx` if your project is configured)—be consistent within the same project.
6. **Shared components** (Modal, Layout, Header, Footer) live in `components/Shared/` — reusable across pages.
7. **Custom hooks** live in `src/hooks/` — reusable logic used by 2+ components.

Example:

```
components/Home/
```

Contains **only Home page components**.

```
components/Shared/
```

Contains **reusable components** used by multiple pages (Modal, Layout, etc.).

### Import paths

- Prefer path aliases if your project is configured for them, for example:  
`import Hero from "@/components/Home/Hero";`
- If aliases are not available, use relative imports like:  
`import Hero from "../components/Home/Hero";` (from `pages/Home.js`, one level up to `src`, then into `components`)

## For Existing Projects (Brownfield)

⚠️ **Critical Rules**:

- **Never** change existing folder structure or naming conventions
- **Never** mix your new components with existing ones unless following their pattern exactly
- **Always** check existing patterns first:
  - Routing setup (Next.js `pages/` vs React Router)
  - Styling approach (CSS Modules, Styled Components, Sass, etc.)
  - State management (Context, Redux, Zustand, etc.)
  - Component composition patterns
- **Still apply** accessibility and component size rules from this document
- **Styling**: If the project uses CSS Modules, Styled Components, or another system, follow **their** naming conventions instead of forcing BEM. Use BEM only when the project uses plain CSS or Tailwind + custom CSS

---

# 2. Page Development Rules

Each page should be **clean and simple**.

Example:

```
pages/Home.js
```

```javascript
import React from "react";

import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import Testimonials from "../components/Home/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
    </>
  );
}

export default Home;
```

### Rules

- Pages should **only structure the layout**
- Components handle **design and logic**
- Avoid large pages with many lines of code (keep under 100 lines)

Pages are registered in the router (for example in `App.js` or a central `routes` file) with **one route per page component**.

---

# 3. Component Rules

Each component should be **self-contained**.

Example:

```
components/Home/Hero.js
```

```javascript
import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="home-hero">
      <div className="home-hero__container">
        <h1 className="home-hero__title">
          Welcome to Our Website
        </h1>
      </div>
    </section>
  );
}

export default Hero;
```

### Rules

- One component = one UI section
- Each component must have **its own CSS file**
- Keep components **small and reusable** (aim for < 150 lines)
- If a component grows too large, split it into smaller sub-components  


### File Naming
- Components: `PascalCase.js` (e.g., `Hero.js`, `ContactForm.js`)
- Hooks: `camelCase.js` starting with `use` (e.g., `useToggle.js`)
- CSS: `PascalCase.css` matching component name (e.g., `Hero.css`)
- Test files: `PascalCase.test.js` alongside component
  


---

# 4. Powerful Improvement: Component Scoped CSS Naming (BEM Style)

To avoid **CSS conflicts**, all components must use **scoped class names**.

Example for **Hero component**

```
home-hero
home-hero__title
home-hero__button
home-hero__image
```

Example CSS:

```css
.home-hero {
  padding: 80px 0;
}

.home-hero__container {
  max-width: 1120px;
  margin: 0 auto;
}

.home-hero__title {
  font-size: 48px;
}

.home-hero__button {
  margin-top: 20px;
}
```

### Why this is important

Without scoped naming:

```
.title
.button
.container
```

These names **conflict with other components**.

Using scoped naming:

```
home-hero__title
services-card__title
team-member__name
```

Prevents **style breaking across pages**.

This is a **professional practice used by senior React developers**.

---

# 5. Responsiveness Rules (Tailwind + CSS)

Responsiveness must work for:

- Desktop
- Tablet
- Mobile

We combine:

- **Tailwind CSS**
- **Custom CSS files**

### Tailwind for Layout & Responsive Behavior

Example:

```jsx
<div className="px-4 md:px-8 lg:px-16">
```

Breakpoints:


| Device        | Tailwind Prefix |
| ------------- | --------------- |
| Mobile        | default         |
| Tablet        | md:             |
| Desktop       | lg:             |
| Large Desktop | xl:             |
| Extra Large   | 2xl:            |


Example:

```jsx
<div className="text-center md:text-left lg:text-left">
```

---

### Mobile First Design

Always design **mobile first**.

Example:

```jsx
<div className="text-lg md:text-xl lg:text-3xl">
```

---

### Responsive Layout Example

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

Result:

Mobile → 1 column
Tablet → 2 columns
Desktop → 3 columns

---

### Container Rule

Use a **centered container layout**.

Example:

```jsx
<div className="max-w-7xl mx-auto px-4">
```

---

# 6. Custom CSS Rules

Custom CSS is allowed for:

- animations
- complex styling
- special layouts

Custom CSS must follow the **component-scoped BEM naming** from Section 4.  
Avoid global class names like `.container`, `.title`, `.button` because they easily conflict with styles from other components.

---

# 7. Public Assets Rule

All images and SVG files must be stored in:

```
public/
```

Example:

```
public/home/
public/about/
public/contact/
```

Example usage:

```jsx
<img src="/home/hero-image.png" alt="Doctor and patient in a modern clinic" />
```

This keeps **assets organized by page**.

Page-specific assets live under `public/<pageName>/` (e.g. `public/home/`, `public/about/`, `public/contact/`).  
Shared assets (like logos, icons, or brand images used on many pages) live in `public/` or `public/assets/` and can be reused across the app.

---

# 8. Accessibility Basics

- Use **semantic HTML** (`section`, `header`, `nav`, `main`, `article`, `footer`) instead of only `div` when it conveys meaning.
- All images must have **meaningful `alt` text**. Avoid generic values like `alt="Hero"`; instead use text that describes the content or purpose (for example `alt="Smiling doctor talking with a patient"`).
- Ensure interactive elements are **keyboard accessible** (links, buttons, and controls should use `<a>` or `<button>` elements, not plain `<div>`).
- Use proper heading hierarchy (`h1` → `h2` → `h3`) - don't skip levels for styling.
- Ensure sufficient color contrast (WCAG AA minimum).
- Add `aria-label` or `aria-labelledby` for icon-only buttons or complex UI controls.

---

# 9. Hooks

Hooks let your components **remember things** (state) and **do things when something changes** (effects). You only need them when your UI is **interactive** or **loads data**.

### When to Use Hooks


| Situation                                  | Need hooks? | Why                             |
| ------------------------------------------ | ----------- | ------------------------------- |
| Static page (text, images, no clicks)      | No          | Nothing to remember or react to |
| Button click, modal open/close, form input | Yes         | Use `useState`                  |
| Load data from API when page opens         | Yes         | Use `useState` + `useEffect`    |
| Share data across many components          | Yes         | Use `useContext` or a store     |


### Two Hooks You Will Use Most

**1. `useState`** — for things that change when the user interacts (open/close, show/hide, input value).

```javascript
import { useState } from "react";

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);  // false = closed by default

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      {isOpen && <form>...</form>}
    </div>
  );
}
```

**2. `useEffect`** — for things that run when the component loads or when some value changes (e.g. fetch data).

```javascript
import { useState, useEffect } from "react";

function Services() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);  // empty [] = run once when component loads

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <div>{/* show data */}</div>;
}
```

**Simple error handling:** Use `loading` and `error` state. Show "Loading..." while fetching, show the error message if something goes wrong, and only show the data when it's ready.

### Custom Hooks for Reusable Logic

When logic is used in 2+ components, extract to `hooks/`:

```javascript
// hooks/useToggle.js
import { useState, useCallback } from 'react';

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Usage in component
function Navbar() {
  const [isMenuOpen, toggleMenu] = useToggle(false);
  // ...
}
```

**Rules for custom hooks:**

- Name starts with `use` (e.g., `useAuth`, `useFetch`)
- One hook = one purpose
- Return array `[state, setter]` for simple state, object `{data, loading}` for complex data
- Place in `src/hooks/` folder

### Simple Rules for Hooks

- Use hooks **inside** your component function, not outside.
- Put `useState` at the top of the component for things that change (open/close, form values).
- Use `useEffect` when you need to fetch data or run something when the page loads.
- When fetching data: add `loading` and `error` state so users see "Loading..." and know if something failed.
- Start simple: if a page has no buttons, forms, or API calls, you don't need hooks.

---

# 10. Clean Code Rules

Always follow these principles.

### Keep Components Small

Bad:

```
One component with 500 lines
```

Good:

```
Split into multiple components (each < 150 lines)
```

---

### Clear Naming

Bad:

```
Comp1.js
Section.js
Data.js
```

Good:

```
Hero.js
Services.js
TeamMembers.js
```

---

### Inline Styling (Use Sparingly)

Prefer `className` for styling. Use the `style` prop **only** for truly dynamic values (for example values calculated from props or state).

Bad:

```
<div style={{color:"red"}}>
```

Good:

```
className="home-hero__title"
```

---

### Prop Drilling vs Context

- **Props** for 1-2 levels of parent → child communication
- **Context** for 3+ levels or truly global data (theme, user auth, language)
- **State management library** (Redux/Zustand) for complex app-wide state

---

# 11. Common Patterns

## Pattern A: Page with API Data

```jsx
// pages/Blog.js
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogHero from '../components/Blog/Hero';
import BlogList from '../components/Blog/List';
import BlogSkeleton from '../components/Blog/Skeleton';
import BlogError from '../components/Blog/Error';

function Blog() {
  const { posts, loading, error } = useBlogPosts();
  
  if (loading) return <BlogSkeleton />;
  if (error) return <BlogError message={error} />;
  
  return (
    <>
      <BlogHero count={posts.length} />
      <BlogList posts={posts} />
    </>
  );
}

export default Blog;
```

## Pattern B: Modal/Dialog Component

```jsx
// components/Shared/Modal.js
import { useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h2 className="modal-header__title">{title}</h2>
          <button className="modal-header__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
```

## Pattern C: Form Handling

```jsx
// components/Contact/Form.js
import { useState } from 'react';
import './Form.css';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input 
        className="contact-form__input"
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Name"
        required 
      />
      {/* ... more fields ... */}
      <button 
        className="contact-form__submit" 
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send'}
      </button>
      {status === 'success' && <p className="contact-form__success">Sent!</p>}
      {status === 'error' && <p className="contact-form__error">Failed. Try again.</p>}
    </form>
  );
}

export default ContactForm;
```

## Pattern D: Error Boundary for Data Fetching

Wrap data-fetching sections in an error boundary so one failed fetch doesn't crash the whole page:

```jsx
// components/Shared/ErrorBoundary.js
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p>Something went wrong. Please try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// Usage: wrap a page or section that fetches data
// <ErrorBoundary><Blog /></ErrorBoundary>
```

---

# 12. TypeScript Guidelines (If Applicable)

If your project uses TypeScript:

- Use `.tsx` extension consistently for components
- Define props interfaces with descriptive names: `interface HeroProps { title: string; subtitle?: string; }`
- Place shared types in `src/types/` folder or co-locate with components if page-specific
- Avoid `any` - use `unknown` for API responses, then type guard
- Use strict mode in `tsconfig.json`
- Type custom hooks: `function useToggle(initial: boolean = false): [boolean, () => void]`

Example:

```typescript
// components/Home/Hero.tsx
interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

function Hero({ title, subtitle, backgroundImage }: HeroProps) {
  return (
    <section className="home-hero" style={{ backgroundImage }}>
      <h1 className="home-hero__title">{title}</h1>
      {subtitle && <p className="home-hero__subtitle">{subtitle}</p>}
    </section>
  );
}
```

---

# 13. Performance Guidelines

- Use `React.memo()` for pure components receiving complex props (objects/arrays)
- Use `useMemo()` for expensive calculations that don't need to re-run every render
- Use `useCallback()` for functions passed to optimized child components
- Lazy load below-fold sections: 
  ```jsx
  const HeavySection = lazy(() => import('../components/Home/HeavySection'));
  ```
- Images: use `loading="lazy"` and explicit `width`/`height` to prevent layout shift
- Avoid inline object/array definitions in JSX (creates new references every render)
- Use `will-change` CSS property sparingly for animations

---

# 14. Testing Standards

- Test files: `ComponentName.test.js` (or `.tsx`) alongside the component
- Use React Testing Library - test behavior, not implementation
- Mock API calls at page level, test real logic in hooks
- Minimum coverage: critical user paths (happy paths)
- Test accessibility: verify elements are reachable via keyboard/screen reader

Example:

```javascript
// components/Home/Hero.test.js
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

test('renders hero with title', () => {
  render(<Hero title="Welcome" />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});
```

---

# 15. Environment & Configuration

- Use `.env.local` for secrets (never commit to git)
- Use `.env` for public vars (prefixed with `REACT_APP_` for CRA, `VITE_` for Vite, `NEXT_PUBLIC_` for Next.js)
- Keep API base URLs in environment variables
- Document required env vars in README.md

Example `.env`:

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_FEATURE_FLAG_NEW_DASHBOARD=true
```

---

# 16. AI Development Rules (Important for Cursor)

When generating code with AI:

1. Always follow **the folder structure**
2. Place components in the **correct page folder**
3. Always create **separate CSS files**
4. Use **Tailwind for responsiveness**
5. Use **BEM-style class naming**
6. Do not mix components from different pages
7. Prefer path aliases (like `@/components/...`) over long `../../` imports when your project is configured for them
8. Avoid inline styles except where values are truly dynamic; prefer `className` pointing to BEM-style classes
9. Use **hooks** (`useState`, `useEffect`) only when needed—for interactive UI or data fetching; keep static pages simple without hooks
10. When fetching data with `useEffect`, include **loading** and **error** state so the UI shows feedback

## AI Anti-Patterns to Avoid

❌ **Don't**: Generate one giant 500-line component  
✅ **Do**: Split into < 150 line components  

❌ **Don't**: Use generic class names like `.container`, `.title`  
✅ **Do**: Use `home-hero__container`, `about-team__title`  

❌ **Don't**: Mix page-specific components  
✅ **Do**: Keep `components/Home/` and `components/About/` strictly separate  

❌ **Don't**: Forget error handling for data fetching  
✅ **Do**: Wrap data-fetching components in error boundaries (see Pattern D in Section 11); at minimum, use `loading` and `error` state  

❌ **Don't**: Use `any` type in TypeScript  
✅ **Do**: Define proper interfaces  

❌ **Don't**: Forget alt texts or semantic HTML  
✅ **Do**: Check accessibility basics  

---

# 17. State and Data Flow

- **Page-level state**: keep in the page component (for layout-level data) or extract into a custom hook if it becomes complex.
- **Component-specific state**: keep inside the component that owns the UI behavior.
- **Shared state across many components**: use React Context or a global store (like Redux, Zustand, or similar) instead of prop drilling.
- Keep data-fetching logic close to where the data is used (page or top-level layout), and pass only the **minimal props** down into child components.

---

# 18. Troubleshooting Common Issues


| Issue                  | Solution                                                                       |
| ---------------------- | ------------------------------------------------------------------------------ |
| CSS not applying       | Check BEM naming matches exactly (case-sensitive); verify CSS file is imported |
| Images not loading     | Verify path starts with `/` (public folder root); check filename case          |
| Component not updating | Check if state is local or needs lifting; verify props are changing            |
| Slow re-renders        | Check for inline objects/functions in JSX; use `useMemo`/`useCallback`         |
| Import errors          | Verify path aliases are configured in `jsconfig.json` or `tsconfig.json`       |
| Hook rules error       | Ensure hooks are called at top level, not inside conditions or loops           |
| CORS errors            | Check API URL in environment variables; verify backend CORS settings           |
| TypeScript errors      | Run `tsc --noEmit` to check all files; verify strict mode settings             |


---

# 19. Security Basics

- Never store API keys or secrets in frontend code (use environment variables)
- Sanitize user inputs before displaying (prevent XSS)
- Use `dangerouslySetInnerHTML` only with sanitized content (DOMPurify)
- Validate file uploads (type, size) before sending to server
- Use HTTPS for all API calls in production

---

This document ensures AI tools produce **clean, consistent, production-ready code** that follows industry best practices.
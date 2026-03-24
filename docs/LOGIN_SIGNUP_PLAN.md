# Login & Signup Implementation Plan — Health & Mind Care Clinic

## Context

The Health & Mind Care Clinic website (React + Vite + Tailwind + Supabase) currently has zero authentication. There are no login/signup pages, no auth context, no session management, and no route protection. The /admin/appointments route is publicly accessible. This plan implements complete login, signup, forgot-password pages and admin login — covering both frontend (React pages, auth context, route guards, navbar updates) and backend (Supabase profiles table, RLS policies, triggers).

Auth method: Email + Password only
Social login: Skipped for now (can be added later)
Email confirmation: OFF
No new npm dependencies needed — @supabase/supabase-js v2.99.1 already includes all auth methods.

---

## Files Overview

### New Files

| File | Purpose |
|------|---------|
| src/contexts/AuthContext.jsx | Auth state provider (user, session, isAdmin, helpers) |
| src/pages/AuthPage.jsx | Unified Login / Signup / Forgot Password / Reset Password UI |
| src/components/Auth/ProtectedRoute.jsx | Generic route guard (adminOnly flag) |
| src/pages/AdminAppointments.jsx | Admin view to list, edit, cancel all appointments |
| src/pages/AdminDoctors.jsx | Admin view to list all doctors |
| src/pages/AdminPatients.jsx | Admin view to list all patients |

### Modified Files

| File | Changes |
|------|---------|
| src/App.jsx | Wrap in AuthProvider, add auth routes, wrap admin routes in AdminRoute |
| src/components/Shared/Navbar.jsx | Add Login button (logged out) + user dropdown menu (logged in) |

### SQL Script

| File | Purpose |
|------|---------|
| supabase-auth-profiles.sql | Profiles table, RLS policies, auto-create trigger |

---

## Implementation Steps

### Step 1: Supabase Backend — Profiles, Roles & RLS

File: supabase-auth-profiles.sql (run in Supabase Dashboard SQL Editor)

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TYPE app_role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
```

Trigger handle_new_user runs on insert into auth.users and:
- Inserts into profiles (using NEW.id, NEW.email, and NEW.raw_user_meta_data->>'full_name')
- Inserts into user_roles a default row (user_id = NEW.id, role = 'user')

RLS Policies:
- Profiles: users can SELECT their own profile (auth.uid() = id); admins can SELECT all profiles via has_role(auth.uid(), 'admin') SECURITY DEFINER helper
- User roles: regular users do not read/modify roles directly; admin checks use has_role
- Appointments: users can SELECT their own appointments; admins can SELECT/UPDATE all via has_role(auth.uid(), 'admin')

---

### Step 2: AuthContext — Session Management

File: src/contexts/AuthContext.jsx

- AuthProvider wraps the app inside BrowserRouter
- On mount: registers supabase.auth.onAuthStateChange() before calling supabase.auth.getSession()
- When session is present, fetches user profile from profiles and checks roles via getUserRoles(user.id)
- Exposes via context: { user, session, profile, roles, isAdmin, loading, signIn, signUp, signOut }
- isAdmin derived from roles.includes('admin')
- loading is true until initial session + roles check completes

---

### Step 3: Auth Layout

Auth pages share a minimal centered layout (no Navbar/Footer):
- Clinic logo linked to /
- White card: max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8
- Background: min-h-screen bg-gray-50

---

### Step 4: AuthPage — Login / Signup / Forgot / Reset

File: src/pages/AuthPage.jsx

Signup tab AuthPage mein hi handle hoga. Alag Register.jsx file nahi banegi.

| View | Trigger | Action |
|------|---------|--------|
| Login | Default tab | supabase.auth.signInWithPassword() |
| Signup | Tab switch | supabase.auth.signUp() with full_name in metadata |
| Forgot Password | "Forgot?" link | supabase.auth.resetPasswordForEmail() |
| Reset Password | URL has #type=recovery | supabase.auth.updateUser({ password }) |

---

#### Login View UI

```
+---------------------------------------------------------------+
|                      [Clinic Logo]                             |
|              Health & Mind Care Clinic                         |
|                                                                |
|  +----------------------------------------------------------+ |
|  |              Sign in to your account                      | |
|  |                                                           | |
|  |  Email Address                                            | |
|  |  [____________________________________]                   | |
|  |                                                           | |
|  |  Password                                                 | |
|  |  [______________________________] [eye]                   | |
|  |                                  Forgot Password?         | |
|  |                                                           | |
|  |  [error message here if any — red text]                   | |
|  |                                                           | |
|  |  [ Sign In ]                                              | |
|  |                                                           | |
|  |  Don't have an account? Sign Up                           | |
|  +----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

#### Login View Flow
- If user already logged in → redirect to / or location.state?.from
- Form state: { email, password }
- Validation: require email and password (min 6 chars)
- On success: navigate to saved destination or /
- Admin user login → redirect to /admin/appointments

#### Login Error Messages

| Supabase Error | Message Shown to User |
|---------------|----------------------|
| Invalid login credentials | "Incorrect email or password. Please try again." |
| Email not confirmed | "Please confirm your email before logging in." |
| Too many requests | "Too many attempts. Please wait a few minutes and try again." |
| Network error | "Connection error. Please check your internet and try again." |
| Any other error | "Something went wrong. Please try again." |

---

#### Signup View UI

```
+---------------------------------------------------------------+
|                      [Clinic Logo]                             |
|              Health & Mind Care Clinic                         |
|                                                                |
|  +----------------------------------------------------------+ |
|  |                  Create Account                           | |
|  |                                                           | |
|  |  Full Name                                                | |
|  |  [____________________________________]                   | |
|  |                                                           | |
|  |  Email Address                                            | |
|  |  [____________________________________]                   | |
|  |                                                           | |
|  |  Password                                                 | |
|  |  [______________________________] [eye]                   | |
|  |  (min 6 characters)                                       | |
|  |                                                           | |
|  |  Confirm Password                                         | |
|  |  [______________________________] [eye]                   | |
|  |                                                           | |
|  |  [error message here if any — red text]                   | |
|  |                                                           | |
|  |  [ Create Account ]                                       | |
|  |                                                           | |
|  |  Already have an account? Login                           | |
|  +----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

#### Signup View Flow
- If user already logged in → redirect to /
- Form state: { fullName, email, password, confirmPassword }
- Validation: all fields required, valid email, passwords match, min 6 chars
- Submit: supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
- Email confirmation OFF → immediate sign-in → redirect to /

#### Signup Error Messages

| Supabase Error | Message Shown to User |
|---------------|----------------------|
| User already registered | "An account with this email already exists. Please log in." |
| Password should be at least 6 characters | "Password must be at least 6 characters." |
| Unable to validate email address | "Please enter a valid email address." |
| Too many requests | "Too many attempts. Please wait a few minutes and try again." |
| Network error | "Connection error. Please check your internet and try again." |
| Passwords do not match (frontend check) | "Passwords do not match. Please try again." |
| Any other error | "Something went wrong. Please try again." |

---

#### Forgot Password View UI

```
+---------------------------------------------------------------+
|                      [Clinic Logo]                             |
|              Health & Mind Care Clinic                         |
|                                                                |
|  +----------------------------------------------------------+ |
|  |                 Forgot Password?                          | |
|  |     Enter your email to reset your password              | |
|  |                                                           | |
|  |  Email Address                                            | |
|  |  [____________________________________]                   | |
|  |                                                           | |
|  |  [error message here if any — red text]                   | |
|  |  [success message here if sent — green text]              | |
|  |                                                           | |
|  |  [ Send Reset Link ]                                      | |
|  |                                                           | |
|  |  ← Back to Login                                         | |
|  +----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

#### Forgot Password Flow
- User enters email → supabase.auth.resetPasswordForEmail(email, { redirectTo })
- Show success message: "Password reset email sent. Please check your inbox."

#### Forgot Password Error Messages

| Supabase Error | Message Shown to User |
|---------------|----------------------|
| User not found | "No account found with this email address." |
| Too many requests | "Too many reset attempts. Please wait a few minutes and try again." |
| Network error | "Connection error. Please check your internet and try again." |
| Any other error | "Something went wrong. Please try again." |
| Success | "Password reset email sent. Please check your inbox." |

---

#### Reset Password View UI

```
+---------------------------------------------------------------+
|                      [Clinic Logo]                             |
|              Health & Mind Care Clinic                         |
|                                                                |
|  +----------------------------------------------------------+ |
|  |                  Set New Password                         | |
|  |          Enter your new password below                    | |
|  |                                                           | |
|  |  New Password                                             | |
|  |  [______________________________] [eye]                   | |
|  |  (min 6 characters)                                       | |
|  |                                                           | |
|  |  Confirm New Password                                     | |
|  |  [______________________________] [eye]                   | |
|  |                                                           | |
|  |  [error message here if any — red text]                   | |
|  |                                                           | |
|  |  [ Update Password ]                                      | |
|  |                                                           | |
|  |  ← Back to Login                                         | |
|  +----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

#### Reset Password Flow
- URL has #type=recovery → show "Set New Password" form
- On success → sign out → switch to Login with success message

#### Reset Password Error Messages

| Supabase Error | Message Shown to User |
|---------------|----------------------|
| Password should be at least 6 characters | "Password must be at least 6 characters." |
| Same password as current | "New password must be different from your current password." |
| Network error | "Connection error. Please check your internet and try again." |
| Any other error | "Something went wrong. Please try again." |
| Success | "Password updated successfully. Please log in with your new password." |

---

### Step 5: Admin Pages & Capabilities

File: src/pages/AdminAppointments.jsx
- Accessible only to admins (ProtectedRoute adminOnly)
- Table of all appointments with doctor, patient, date/time, status
- Filter/search by doctor, patient, date, status
- Edit appointment (change time, doctor, status)
- Cancel appointment with confirmation modal

File: src/pages/AdminDoctors.jsx
- Accessible only to admins
- List/table of all doctors
- View name, specialization, availability
- Filter/search by department/service

File: src/pages/AdminPatients.jsx
- Accessible only to admins
- List/table of all patients (profiles with user role)
- View name, email
- View patient appointment history

---

### Step 6: ProtectedRoute — Route Guard

File: src/components/Auth/ProtectedRoute.jsx

```
ProtectedRoute({ children, adminOnly? }):
→ if loading         → show centered full page spinner
→ if !user           → redirect to /auth (save current URL in location.state.from)
→ if adminOnly &&
   !isAdmin          → redirect to /
→ else               → render children
```

Usage:
```tsx
// Normal protected page
<ProtectedRoute>
  <Layout><MyPage /></Layout>
</ProtectedRoute>

// Admin only page
<ProtectedRoute adminOnly>
  <Layout><AdminPage /></Layout>
</ProtectedRoute>
```

---

### Step 7: Update App.jsx

File: src/App.jsx

- Import AuthProvider, wrap Routes inside it
- Add /auth route (no full Layout — uses auth layout internally)
- Use ProtectedRoute for protected pages
- Use ProtectedRoute adminOnly for admin pages

```tsx
<Route path="/auth" element={<AuthPage />} />

<Route path="/admin/appointments" element={
  <ProtectedRoute adminOnly><Layout><AdminAppointments /></Layout></ProtectedRoute>
} />
<Route path="/admin/doctors" element={
  <ProtectedRoute adminOnly><Layout><AdminDoctors /></Layout></ProtectedRoute>
} />
<Route path="/admin/patients" element={
  <ProtectedRoute adminOnly><Layout><AdminPatients /></Layout></ProtectedRoute>
} />
```

---

### Step 8: Update Navbar

File: src/components/Shared/Navbar.jsx

Logged out (desktop): "Login" outlined button → /auth + "Make Appointment" primary button

Logged in (desktop): "Make Appointment" + user avatar + dropdown:
- My Dashboard
- My Appointments
- Sign Out

If isAdmin === true, also show:
- Admin Appointments
- Admin Doctors
- Admin Patients

Mobile: Login link (logged out) or Dashboard / Admin links / Sign Out (logged in)

---

## Implementation Order

1. supabase-auth-profiles.sql — Run in Supabase Dashboard
2. src/contexts/AuthContext.jsx — Foundation for everything
3. src/pages/AuthPage.jsx — Combined Login/Signup/Forgot/Reset
4. src/components/Auth/ProtectedRoute.jsx — Route guard
5. src/pages/AdminAppointments.jsx / AdminDoctors.jsx / AdminPatients.jsx
6. src/App.jsx — Wire up routes + AuthProvider
7. src/components/Shared/Navbar.jsx — Auth-aware navigation

---

## Verification Plan

| Test | Expected Result |
|------|----------------|
| Visit /auth → Signup tab → fill form | Account created → redirect to / |
| Visit /auth → Login tab → enter credentials | Logged in → redirect to / |
| Login as admin | Redirect to /admin/appointments |
| Refresh page | Session persists — no flash of login page |
| Navbar logged out | Shows Login button |
| Navbar logged in | Shows avatar + dropdown |
| Sign Out | Logged out, Login button returns |
| Visit /admin/* logged out | Redirect to /auth |
| Login as non-admin → /admin/* | Redirect to / |
| Login as admin → /admin/appointments | All appointments visible, edit/cancel works |
| Login as admin → /admin/doctors | Full doctor list visible |
| Login as admin → /admin/patients | Patient list + history visible |
| Wrong email/password | "Incorrect email or password. Please try again." |
| Existing email signup | "An account with this email already exists. Please log in." |
| Passwords not matching | "Passwords do not match. Please try again." |
| Forgot password → valid email | "Password reset email sent. Please check your inbox." |
| Forgot password → unknown email | "No account found with this email address." |
| Reset password → success | "Password updated successfully. Please log in with your new password." |
| Loading state | Centered spinner shown — no flash of protected content |
| All auth pages mobile 320px | Fully responsive |
| All auth pages tablet 768px | Fully responsive |
| All auth pages desktop 1280px | Fully responsive |
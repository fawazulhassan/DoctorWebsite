import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ASSET } from '../utils/asset';

const inputClass =
  'w-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none';

function mapError(error, view) {
  if (!error) return 'Something went wrong. Please try again.';
  const msg = error.message || '';

  if (msg.includes('Invalid login credentials'))
    return 'Incorrect email or password. Please try again.';
  if (msg.includes('Email not confirmed'))
    return 'Please confirm your email before logging in.';
  if (msg.includes('User already registered'))
    return 'An account with this email already exists. Please log in.';
  if (msg.includes('Password should be at least 6'))
    return 'Password must be at least 6 characters.';
  if (msg.includes('Unable to validate email'))
    return 'Please enter a valid email address.';
  if (msg.includes('same_password') || msg.includes('same password'))
    return 'New password must be different from your current password.';
  if (msg.includes('rate') || msg.includes('Too many'))
    return view === 'forgot'
      ? 'Too many reset attempts. Please wait a few minutes and try again.'
      : 'Too many attempts. Please wait a few minutes and try again.';
  if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed'))
    return 'Connection error. Please check your internet and try again.';

  return 'Something went wrong. Please try again.';
}

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function PasswordInput({ id, label, value, onChange, hint, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder || ''}
          className={inputClass + ' pr-10'}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <EyeIcon open={show} />
        </button>
      </div>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

/* ================================================================
   VIEW: LOGIN
   ================================================================ */
function LoginView({ onSwitch, successMessage }) {
  const { signIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (status === 'error') { setStatus('idle'); setErrorMessage(''); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) { setErrorMessage('Please enter your email address.'); setStatus('error'); return; }
    if (!form.password || form.password.length < 6) { setErrorMessage('Password must be at least 6 characters.'); setStatus('error'); return; }

    setStatus('submitting');
    const { error } = await signIn(form.email.trim(), form.password);
    if (error) {
      setErrorMessage(mapError(error, 'login'));
      setStatus('error');
      return;
    }
    navigate(from === '/auth' ? '/' : from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Sign in to your account</h2>
      </div>

      {successMessage && (
        <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2" role="status">{successMessage}</p>
      )}

      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input id="login-email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
          <button type="button" onClick={() => onSwitch('forgot')} className="text-xs text-primary hover:text-primary-hover font-medium">Forgot Password?</button>
        </div>
        <PasswordInput id="login-password" label="" value={form.password} onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); if (status === 'error') { setStatus('idle'); setErrorMessage(''); } }} />
      </div>

      {status === 'error' && <p className="text-sm text-red-600" role="alert">{errorMessage}</p>}

      <button type="submit" disabled={status === 'submitting'} className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
        {status === 'submitting' ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={() => onSwitch('signup')} className="text-primary hover:text-primary-hover font-medium">Sign Up</button>
      </p>
    </form>
  );
}

/* ================================================================
   VIEW: SIGNUP
   ================================================================ */
function SignupView({ onSwitch }) {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (status === 'error') { setStatus('idle'); setErrorMessage(''); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) { setErrorMessage('Please enter your full name.'); setStatus('error'); return; }
    if (!form.email.trim()) { setErrorMessage('Please enter your email address.'); setStatus('error'); return; }
    if (form.password.length < 6) { setErrorMessage('Password must be at least 6 characters.'); setStatus('error'); return; }
    if (form.password !== form.confirmPassword) { setErrorMessage('Passwords do not match. Please try again.'); setStatus('error'); return; }

    setStatus('submitting');
    const { error } = await signUp(form.email.trim(), form.password, form.fullName.trim());
    if (error) {
      setErrorMessage(mapError(error, 'signup'));
      setStatus('error');
      return;
    }
    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Create Account</h2>
      </div>

      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input id="signup-name" name="fullName" type="text" value={form.fullName} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input id="signup-email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
      </div>

      <PasswordInput id="password" label="Password" value={form.password} onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })} hint="min 6 characters" />

      <PasswordInput id="confirmPassword" label="Confirm Password" value={form.confirmPassword} onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value } })} />

      {status === 'error' && <p className="text-sm text-red-600" role="alert">{errorMessage}</p>}

      <button type="submit" disabled={status === 'submitting'} className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
        {status === 'submitting' ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button type="button" onClick={() => onSwitch('login')} className="text-primary hover:text-primary-hover font-medium">Login</button>
      </p>
    </form>
  );
}

/* ================================================================
   VIEW: FORGOT PASSWORD
   ================================================================ */
function ForgotView({ onSwitch }) {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setMessage({ type: 'error', text: 'Please enter your email address.' }); setStatus('error'); return; }

    setStatus('submitting');
    const { error } = await resetPassword(email.trim());
    if (error) {
      setMessage({ type: 'error', text: mapError(error, 'forgot') });
      setStatus('error');
      return;
    }
    setMessage({ type: 'success', text: 'Password reset email sent. Please check your inbox.' });
    setStatus('success');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="mt-1 text-sm text-gray-500">Enter your email to reset your password</p>
      </div>

      <div>
        <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input id="forgot-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setMessage({ type: '', text: '' }); } }} className={inputClass} />
      </div>

      {message.text && (
        <p className={`text-sm rounded-lg px-4 py-2 ${message.type === 'error' ? 'text-red-600 bg-red-50 border border-red-200' : 'text-green-600 bg-green-50 border border-green-200'}`} role={message.type === 'error' ? 'alert' : 'status'}>
          {message.text}
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
        {status === 'submitting' ? 'Sending...' : 'Send Reset Link'}
      </button>

      <button type="button" onClick={() => onSwitch('login')} className="w-full text-center text-sm text-gray-600 hover:text-gray-900">
        &larr; Back to Login
      </button>
    </form>
  );
}

/* ================================================================
   VIEW: RESET PASSWORD
   ================================================================ */
function ResetView({ onSwitch }) {
  const { updatePassword, signOut } = useAuth();

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setMessage({ type: 'error', text: 'Password must be at least 6 characters.' }); setStatus('error'); return; }
    if (form.password !== form.confirmPassword) { setMessage({ type: 'error', text: 'Passwords do not match. Please try again.' }); setStatus('error'); return; }

    setStatus('submitting');
    const { error } = await updatePassword(form.password);
    if (error) {
      setMessage({ type: 'error', text: mapError(error, 'reset') });
      setStatus('error');
      return;
    }
    await signOut();
    setMessage({ type: 'success', text: 'Password updated successfully. Please log in with your new password.' });
    setStatus('success');
    setTimeout(() => onSwitch('login', 'Password updated successfully. Please log in with your new password.'), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Set New Password</h2>
        <p className="mt-1 text-sm text-gray-500">Enter your new password below</p>
      </div>

      <PasswordInput id="new-password" label="New Password" value={form.password} onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); if (status === 'error') setStatus('idle'); }} hint="min 6 characters" />

      <PasswordInput id="confirm-new-password" label="Confirm New Password" value={form.confirmPassword} onChange={(e) => { setForm((p) => ({ ...p, confirmPassword: e.target.value })); if (status === 'error') setStatus('idle'); }} />

      {message.text && (
        <p className={`text-sm rounded-lg px-4 py-2 ${message.type === 'error' ? 'text-red-600 bg-red-50 border border-red-200' : 'text-green-600 bg-green-50 border border-green-200'}`} role={message.type === 'error' ? 'alert' : 'status'}>
          {message.text}
        </p>
      )}

      <button type="submit" disabled={status === 'submitting' || status === 'success'} className="w-full px-4 py-3 md:py-3.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
        {status === 'submitting' ? 'Updating...' : 'Update Password'}
      </button>

      <button type="button" onClick={() => onSwitch('login')} className="w-full text-center text-sm text-gray-600 hover:text-gray-900">
        &larr; Back to Login
      </button>
    </form>
  );
}

/* ================================================================
   MAIN: AuthPage
   ================================================================ */
export default function AuthPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('login');
  const [successMessage, setSuccessMessage] = useState('');

  // Detect recovery flow from URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      setView('reset');
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && view !== 'reset') {
      navigate(isAdmin ? '/admin/appointments' : '/', { replace: true });
    }
  }, [user, loading, isAdmin, navigate, view]);

  const handleSwitch = (newView, message) => {
    setView(newView);
    setSuccessMessage(message || '');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <Link to="/" className="mb-6">
        <img
          src={ASSET('nav-logo.png')}
          alt="Health & Mind Care Clinic"
          className="h-10 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <span className="hidden font-bold text-gray-900 text-xl">Health & Mind Care Clinic</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        {view === 'login' && <LoginView onSwitch={handleSwitch} successMessage={successMessage} />}
        {view === 'signup' && <SignupView onSwitch={handleSwitch} />}
        {view === 'forgot' && <ForgotView onSwitch={handleSwitch} />}
        {view === 'reset' && <ResetView onSwitch={handleSwitch} />}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        &copy; 2024 Health &amp; Mind Care Clinic. All rights reserved.
      </p>
    </div>
  );
}

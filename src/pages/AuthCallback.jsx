import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL hash parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);

        // Check for error in URL
        const error = hashParams.get('error') || queryParams.get('error');
        const errorDescription = hashParams.get('error_description') || queryParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'An error occurred during verification.');
          return;
        }

        // Check for code (PKCE flow) or access_token (implicit flow)
        const code = queryParams.get('code');
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type') || queryParams.get('type');

        if (code) {
          // PKCE flow - exchange code for session
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setStatus('error');
            setMessage(exchangeError.message);
            return;
          }
        } else if (accessToken) {
          // Implicit flow - session should be set automatically by Supabase
          // Just wait for the auth state to update
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Check if this was email confirmation
        if (type === 'signup' || type === 'email_change') {
          setStatus('success');
          setMessage('Email verified successfully! Redirecting to login...');
          setTimeout(() => navigate('/auth', { replace: true }), 2000);
        } else if (type === 'recovery') {
          setStatus('success');
          setMessage('Redirecting to reset password...');
          setTimeout(() => navigate('/auth', { replace: true }), 1000);
        } else {
          // Default: redirect to home if already logged in, or auth page
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setStatus('success');
            setMessage('Logged in! Redirecting...');
            setTimeout(() => navigate('/', { replace: true }), 1000);
          } else {
            setStatus('success');
            setMessage('Verification complete! Redirecting to login...');
            setTimeout(() => navigate('/auth', { replace: true }), 2000);
          }
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        console.error('Auth callback error:', err);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center">
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-600">{message}</h2>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-4">{message}</h2>
            <button
              onClick={() => navigate('/auth', { replace: true })}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

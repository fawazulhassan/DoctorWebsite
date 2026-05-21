import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ToastBanner from './ToastBanner';

/**
 * Admin UI to view/edit the profile email linked to a doctor_slug.
 * Updates profiles.email only (not auth.users.email).
 */
export default function DoctorEmailCard({ slug }) {
  const [profileId, setProfileId] = useState(null);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setToast({ type: '', message: '' });
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('doctor_slug', slug)
        .maybeSingle();

      if (cancelled) return;

      if (error || !data) {
        setProfileId(null);
        setDraft('');
      } else {
        setProfileId(data.id);
        setDraft(data.email || '');
      }
      setLoading(false);
    }

    loadProfile();
    return () => { cancelled = true; };
  }, [slug]);

  async function handleSave() {
    if (!profileId) return;
    setSaving(true);
    setToast({ type: '', message: '' });
    const { error } = await supabase
      .from('profiles')
      .update({ email: draft.trim() })
      .eq('id', profileId);

    setSaving(false);
    if (error) {
      setToast({ type: 'error', message: error.message || 'Failed to save email.' });
      return;
    }
    setToast({ type: 'success', message: 'Profile email saved successfully.' });
  }

  if (loading) {
    return (
      <div className="mb-4 py-2">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profileId) {
    return (
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Linked account email</p>
        <p className="text-sm text-gray-500">No account linked</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Linked account email</p>
      <input
        type="email"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        disabled={saving}
        placeholder="doctor@example.com"
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none disabled:opacity-70"
      />
      <p className="mt-1 text-xs text-gray-500">
        Updates profile email only. Auth login email is managed separately.
      </p>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-2 px-4 py-1.5 text-sm rounded-lg bg-primary text-white font-medium hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
      <ToastBanner
        message={toast.message}
        type={toast.type}
        onDismiss={() => setToast({ type: '', message: '' })}
      />
    </div>
  );
}

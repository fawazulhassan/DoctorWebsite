import { supabase } from '../lib/supabase';

/**
 * Permanently delete an appointment row (admin RLS required).
 * @param {string} id - appointment uuid
 * @returns {{ error: import('@supabase/supabase-js').PostgrestError | null }}
 */
export async function deleteAppointmentById(id) {
  const { error } = await supabase.from('appointments').delete().eq('id', id);
  return { error };
}

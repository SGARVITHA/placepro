import { supabase } from './supabaseService.js';

export async function getCompanies(search) {
  let query = supabase.from('companies').select('id, name, logo_url');

  if (search && typeof search === 'string' && search.trim() !== '') {
    query = query.ilike('name', `%${search.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

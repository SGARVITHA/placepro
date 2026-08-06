import { supabase } from './supabaseService.js';

export async function getCategories(isCommon) {
  let query = supabase.from('categories').select('id, name, is_common');

  if (isCommon === 'true' || isCommon === 'false') {
    query = query.eq('is_common', isCommon === 'true');
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

import { supabase } from './supabaseService.js';

// In-memory fallback cache for development or when remote Supabase bookmarks table is pending migration
const memoryBookmarksByUser = new Map();

/**
 * Fetch bookmarks for a given user
 */
export async function getUserBookmarks(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id, user_id, question_id, created_at, metadata')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      return data;
    }
  } catch (err) {
    // Schema cache / table missing fallback
  }

  // Return user-isolated memory cache
  const userList = memoryBookmarksByUser.get(userId) || [];
  return userList;
}

/**
 * Add a bookmark for the authenticated user
 */
export async function addBookmark(userId, questionId, metadata = {}) {
  if (!userId) throw new Error('User ID is required');
  if (!questionId) throw new Error('Question ID is required');

  const now = new Date().toISOString();
  const newRecord = {
    id: `bm-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    user_id: userId,
    question_id: questionId,
    created_at: now,
    metadata,
  };

  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .upsert(
        {
          user_id: userId,
          question_id: questionId,
          created_at: now,
          metadata,
        },
        { onConflict: 'user_id,question_id' }
      )
      .select()
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    // Fallback to memory
  }

  const existing = memoryBookmarksByUser.get(userId) || [];
  const filtered = existing.filter((b) => b.question_id !== questionId);
  const updated = [newRecord, ...filtered];
  memoryBookmarksByUser.set(userId, updated);
  return newRecord;
}

/**
 * Remove a bookmark for the authenticated user
 */
export async function removeBookmark(userId, questionId) {
  if (!userId) throw new Error('User ID is required');
  if (!questionId) throw new Error('Question ID is required');

  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('question_id', questionId);

    if (!error) {
      // Also clean memory cache if present
      const existing = memoryBookmarksByUser.get(userId) || [];
      memoryBookmarksByUser.set(
        userId,
        existing.filter((b) => b.question_id !== questionId)
      );
      return { success: true };
    }
  } catch (err) {
    // Fallback
  }

  const existing = memoryBookmarksByUser.get(userId) || [];
  memoryBookmarksByUser.set(
    userId,
    existing.filter((b) => b.question_id !== questionId)
  );
  return { success: true };
}

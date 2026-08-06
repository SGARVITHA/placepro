import { supabase } from './supabaseService.js';

export async function getTopics({ categoryId, companyId, parentTopicId, search }) {
  let query = supabase
    .from('topics')
    .select('id, name, category_id, company_id, parent_topic_id');

  // Always filter categoryId
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  // Company ID filter logic
  if (companyId && companyId.trim() !== '') {
    query = query.eq('company_id', companyId);
  } else {
    query = query.is('company_id', null);
  }

  // Parent Topic ID filter logic
  if (parentTopicId && parentTopicId !== 'null' && parentTopicId.trim() !== '') {
    query = query.eq('parent_topic_id', parentTopicId);
  } else {
    query = query.is('parent_topic_id', null);
  }

  // Search filter logic
  if (search && typeof search === 'string' && search.trim() !== '') {
    query = query.ilike('name', `%${search.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Efficiently check which returned topics have children
  const topicIds = data.map((t) => t.id);

  const { data: childTopics, error: childError } = await supabase
    .from('topics')
    .select('parent_topic_id')
    .in('parent_topic_id', topicIds);

  if (childError) {
    throw childError;
  }

  const parentIdsWithChildren = new Set(
    (childTopics || []).map((ct) => ct.parent_topic_id)
  );

  return data.map((topic) => ({
    ...topic,
    has_children: parentIdsWithChildren.has(topic.id),
  }));
}

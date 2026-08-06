import { supabase } from './supabaseService.js';

export async function getQuestions({ topicId, difficulty, search }) {
  let query = supabase
    .from('questions')
    .select('id, difficulty, question_text, company_name, year_asked, topic_id');

  // Always filter by topicId
  if (topicId) {
    query = query.eq('topic_id', topicId);
  }

  // Filter by difficulty if provided
  if (difficulty && typeof difficulty === 'string' && difficulty.trim() !== '') {
    query = query.eq('difficulty', difficulty.trim());
  }

  // Filter by search text if provided
  if (search && typeof search === 'string' && search.trim() !== '') {
    query = query.ilike('question_text', `%${search.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getQuestionById(id) {
  // Fetch single question row
  const { data: question, error: questionError } = await supabase
    .from('questions')
    .select('id, difficulty, question_text, solution_text, company_name, year_asked, topic_id')
    .eq('id', id)
    .maybeSingle();

  if (questionError) {
    throw questionError;
  }

  if (!question) {
    return null;
  }

  let topicName = null;
  let categoryName = null;

  if (question.topic_id) {
    // Fetch associated topic
    const { data: topic, error: topicError } = await supabase
      .from('topics')
      .select('name, category_id')
      .eq('id', question.topic_id)
      .maybeSingle();

    if (topicError) {
      throw topicError;
    }

    if (topic) {
      topicName = topic.name;

      if (topic.category_id) {
        // Fetch associated category
        const { data: category, error: categoryError } = await supabase
          .from('categories')
          .select('name')
          .eq('id', topic.category_id)
          .maybeSingle();

        if (categoryError) {
          throw categoryError;
        }

        if (category) {
          categoryName = category.name;
        }
      }
    }
  }

  return {
    id: question.id,
    difficulty: question.difficulty,
    question_text: question.question_text,
    solution_text: question.solution_text,
    company_name: question.company_name,
    year_asked: question.year_asked,
    topic_id: question.topic_id,
    category: categoryName,
    topic_name: topicName,
  };
}

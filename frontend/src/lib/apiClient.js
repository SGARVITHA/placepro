import supabase from './supabaseClient';

const BASE_URL = 'http://localhost:4000/api';

function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

async function fetchWithAuth(endpoint, params = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const queryString = buildQueryString(params);
  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      data?.error?.message || data?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

export async function getCompanies(search) {
  return fetchWithAuth('/companies', { search });
}

export async function getCategories(isCommon) {
  return fetchWithAuth('/categories', { isCommon });
}

export async function getTopics({ categoryId, companyId, parentTopicId, search } = {}) {
  return fetchWithAuth('/topics', { categoryId, companyId, parentTopicId, search });
}

export async function getQuestions({ topicId, difficulty, search } = {}) {
  return fetchWithAuth('/questions', { topicId, difficulty, search });
}

export async function getQuestionById(id) {
  if (!id) {
    throw new Error('Question ID is required');
  }
  return fetchWithAuth(`/questions/${id}`);
}

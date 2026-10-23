import supabase from './supabaseClient';
import mockApiService from '../services/mockApiService';
import { bookmarkService } from '../services/bookmarkService';

const BASE_URL = 'http://localhost:4000/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

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

export async function fetchWithAuth(endpoint, params = {}, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const queryString = buildQueryString(params);
  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    ...options,
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
  if (USE_MOCK_API) {
    return mockApiService.getCompanies(search);
  }
  return fetchWithAuth('/companies', { search });
}

export async function getCategories(isCommon) {
  if (USE_MOCK_API) {
    return mockApiService.getCategories(isCommon);
  }
  return fetchWithAuth('/categories', { isCommon });
}

export async function getTopics({ categoryId, companyId, parentTopicId, search } = {}) {
  if (USE_MOCK_API) {
    return mockApiService.getTopics({ categoryId, companyId, parentTopicId, search });
  }
  return fetchWithAuth('/topics', { categoryId, companyId, parentTopicId, search });
}

export async function getQuestions({ topicId, difficulty, search, companyId } = {}) {
  if (USE_MOCK_API) {
    return mockApiService.getQuestions({ topicId, difficulty, search, companyId });
  }
  return fetchWithAuth('/questions', { topicId, difficulty, search, companyId });
}

export async function getQuestionById(id) {
  if (!id) {
    throw new Error('Question ID is required');
  }
  if (USE_MOCK_API) {
    return mockApiService.getQuestionById(id);
  }
  return fetchWithAuth(`/questions/${id}`);
}

export async function getBookmarks() {
  if (USE_MOCK_API) {
    return bookmarkService.getBookmarks();
  }
  return fetchWithAuth('/bookmarks');
}

export async function addBookmark(questionId, metadata = {}) {
  if (USE_MOCK_API) {
    return bookmarkService.addBookmark(questionId, metadata);
  }
  return fetchWithAuth(`/bookmarks/${questionId}`, {}, {
    method: 'POST',
    body: JSON.stringify({ metadata }),
  });
}

export async function removeBookmark(questionId) {
  if (USE_MOCK_API) {
    return bookmarkService.removeBookmark(questionId);
  }
  return fetchWithAuth(`/bookmarks/${questionId}`, {}, {
    method: 'DELETE',
  });
}


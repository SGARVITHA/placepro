import { useQuery } from '@tanstack/react-query';
import {
  getCompanies,
  getCategories,
  getTopics,
  getQuestions,
  getQuestionById,
} from '../lib/apiClient';

export function useCompanies(search, options = {}) {
  return useQuery({
    queryKey: ['companies', search],
    queryFn: () => getCompanies(search),
    ...options,
  });
}

export function useCategories(isCommon, options = {}) {
  return useQuery({
    queryKey: ['categories', isCommon],
    queryFn: () => getCategories(isCommon),
    ...options,
  });
}

export function useTopics({ categoryId, companyId, parentTopicId, search } = {}, options = {}) {
  return useQuery({
    queryKey: ['topics', categoryId, companyId, parentTopicId, search],
    queryFn: () => getTopics({ categoryId, companyId, parentTopicId, search }),
    enabled: Boolean(categoryId),
    ...options,
  });
}

export function useQuestions({ topicId, difficulty, search } = {}, options = {}) {
  return useQuery({
    queryKey: ['questions', topicId, difficulty, search],
    queryFn: () => getQuestions({ topicId, difficulty, search }),
    enabled: Boolean(topicId),
    ...options,
  });
}

export function useQuestionDetail(id, options = {}) {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    enabled: Boolean(id),
    ...options,
  });
}



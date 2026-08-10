import { useQuery } from '@tanstack/react-query';
import {
  getCompanies,
  getCategories,
  getTopics,
  getQuestions,
  getQuestionById,
} from '../lib/apiClient';

export function useCompanies(search) {
  return useQuery({
    queryKey: ['companies', search],
    queryFn: () => getCompanies(search),
  });
}

export function useCategories(isCommon) {
  return useQuery({
    queryKey: ['categories', isCommon],
    queryFn: () => getCategories(isCommon),
  });
}

export function useTopics({ categoryId, companyId, parentTopicId, search } = {}) {
  return useQuery({
    queryKey: ['topics', categoryId, companyId, parentTopicId, search],
    queryFn: () => getTopics({ categoryId, companyId, parentTopicId, search }),
    enabled: Boolean(categoryId),
  });
}

export function useQuestions({ topicId, difficulty, search } = {}) {
  return useQuery({
    queryKey: ['questions', topicId, difficulty, search],
    queryFn: () => getQuestions({ topicId, difficulty, search }),
    enabled: Boolean(topicId),
  });
}

export function useQuestionDetail(id) {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    enabled: Boolean(id),
  });
}

export function useContentQuery(queryType, params = {}) {
  if (queryType === 'questionDetail') {
    const id = params?.questionId || params?.id;
    return useQuestionDetail(id);
  }
  return useQuery({
    queryKey: [queryType, params],
    enabled: false,
  });
}


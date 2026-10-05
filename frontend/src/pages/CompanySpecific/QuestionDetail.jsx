import React from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useQuestionDetail, useQuestions, useCompanies, useCategories, useTopics } from '../../hooks/useContentQuery';
import QuestionDetailLayout from '../../components/questions/QuestionDetailLayout';

export default function QuestionDetail() {
  const { companyId, categoryId, topicId, questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const navCompanyName = location.state?.companyName;
  const navCategoryName = location.state?.categoryName;
  const navTopicName = location.state?.topicName;
  const navQuestionText = location.state?.questionText;

  // Single question detail
  const {
    data: question,
    isLoading: isQuestionLoading,
    error: questionError,
    refetch: refetchQuestion,
  } = useQuestionDetail(questionId);

  // Sibling list for next/prev navigation (cache-warm from QuestionList)
  const {
    data: siblingQuestions,
    isLoading: isSiblingsLoading,
  } = useQuestions({ topicId });

  // Fallback queries for breadcrumbs if navigation state is absent
  const { data: companies } = useCompanies(undefined, {
    enabled: !navCompanyName && !question?.company_name,
  });
  const { data: categories } = useCategories(undefined, {
    enabled: !navCategoryName && !question?.category,
  });
  const { data: topics } = useTopics(
    { categoryId, companyId },
    { enabled: !navTopicName && !question?.topic_name }
  );

  const companyName =
    navCompanyName ||
    question?.company_name ||
    companies?.find((c) => String(c.id) === String(companyId))?.name ||
    'Company';

  const categoryName =
    navCategoryName ||
    (typeof question?.category === 'string' ? question?.category : question?.category?.name) ||
    categories?.find((c) => String(c.id) === String(categoryId))?.name ||
    'Category';

  const topicName =
    navTopicName ||
    question?.topic_name ||
    topics?.find((t) => String(t.id) === String(topicId))?.name ||
    'Topic';

  // Loading skeleton
  if (isQuestionLoading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        {/* Card skeleton */}
        <div className="bg-bg-primary border border-border rounded-xl p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>
          <div className="space-y-3 pt-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-4/5 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (questionError) {
    return (
      <div className="max-w-4xl mx-auto bg-bg-primary border border-border rounded-[14px] p-8 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-text-primary">Failed to load question</h3>
        <p className="text-sm text-text-secondary max-w-sm">
          {questionError.message || 'An error occurred while fetching the question details.'}
        </p>
        <button
          onClick={() => refetchQuestion()}
          className="mt-2 px-4 py-2 bg-accent text-white font-medium text-sm rounded-lg hover:bg-accent-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Not found state
  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-bold">Question Not Found</h2>
        <p className="text-text-secondary">The requested question could not be found.</p>
        <Link
          to={`/company/${companyId}/${categoryId}/${topicId}`}
          className="text-accent hover:underline font-medium"
        >
          Return to Questions
        </Link>
      </div>
    );
  }

  const rawQuestionText = question.question_text || navQuestionText || '';
  const questionTitle =
    rawQuestionText.length > 50
      ? `${rawQuestionText.substring(0, 50)}...`
      : rawQuestionText || 'Question';

  const breadcrumbs = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific', to: '/company' },
    { label: companyName, to: `/company/${companyId}` },
    { label: categoryName, to: `/company/${companyId}/${categoryId}` },
    { label: topicName, to: `/company/${companyId}/${categoryId}/${topicId}` },
    { label: questionTitle }
  ];

  const tags = [
    question.difficulty ? { label: question.difficulty, type: 'difficulty' } : null,
    companyName && companyName !== 'Company' ? { label: companyName, type: 'company' } : null,
    question.year_asked ? { label: String(question.year_asked), type: 'year' } : null,
    topicName && topicName !== 'Topic' ? { label: topicName, type: 'topic' } : null,
    categoryName && categoryName !== 'Category' ? { label: categoryName, type: 'category' } : null,
  ].filter(Boolean);

  // Prev / Next calculation
  const siblings = Array.isArray(siblingQuestions) ? siblingQuestions : [];
  const currentIndex = siblings.findIndex((q) => String(q.id) === String(question.id));
  const isSiblingNavDisabled = isSiblingsLoading || currentIndex === -1;
  const disablePrevious = isSiblingNavDisabled || currentIndex <= 0;
  const disableNext = isSiblingNavDisabled || currentIndex >= siblings.length - 1;

  const handlePrevious = () => {
    if (!disablePrevious) {
      const prevQuestion = siblings[currentIndex - 1];
      navigate(`/company/${companyId}/${categoryId}/${topicId}/${prevQuestion.id}`, {
        state: {
          companyName,
          categoryName,
          topicName,
          questionText: prevQuestion.question_text,
        },
      });
    }
  };

  const handleNext = () => {
    if (!disableNext) {
      const nextQuestion = siblings[currentIndex + 1];
      navigate(`/company/${companyId}/${categoryId}/${topicId}/${nextQuestion.id}`, {
        state: {
          companyName,
          categoryName,
          topicName,
          questionText: nextQuestion.question_text,
        },
      });
    }
  };

  return (
    <QuestionDetailLayout
      question={question}
      title={questionTitle}
      breadcrumbs={breadcrumbs}
      tags={tags}
      onPrevious={handlePrevious}
      onNext={handleNext}
      disablePrevious={disablePrevious}
      disableNext={disableNext}
      topicName={topicName}
    />
  );
}

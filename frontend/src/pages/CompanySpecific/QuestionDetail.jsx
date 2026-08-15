import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Breadcrumb from '../../components/layout/Breadcrumb';
import MetadataRow from '../../components/questions/MetadataRow';
import QuestionBlock from '../../components/questions/QuestionBlock';
import SolutionBlock from '../../components/questions/SolutionBlock';
import { useQuestionDetail } from '../../hooks/useContentQuery';
export default function QuestionDetail() {
  const { companyId, categorySlug, sectionId, topicId, questionId, id } = useParams();
  const targetQuestionId = questionId || id;
  const location = useLocation();

  const {
    data: questionData,
    isLoading,
    error,
  } = useQuestionDetail(targetQuestionId);

  const isCompanyContext = Boolean(companyId);

  // Construct back URL to previous Question List route (minus questionId)
  const backUrl = isCompanyContext
    ? `/company/${companyId}/${categorySlug}/${sectionId}/${topicId}`
    : `/prep/${categorySlug}/${sectionId}/${topicId}`;

  // Derive labels for breadcrumb
  const topicName = questionData?.topic_name || location.state?.topicName || 'Topic';
  const categoryName = questionData?.category || location.state?.categoryName || 'Category';
  const companyName = questionData?.company_name || location.state?.companyName || 'Company';
  const sectionName = location.state?.sectionName || 'Section';

  const breadcrumbPath = isCompanyContext
    ? [
        { label: 'Dashboard', href: '/' },
        { label: 'Company Specific', href: '/company' },
        { label: companyName, href: `/company/${companyId}` },
        { label: categoryName, href: `/company/${companyId}/${categorySlug}` },
        { label: sectionName, href: `/company/${companyId}/${categorySlug}/${sectionId}` },
        { label: topicName, href: `/company/${companyId}/${categorySlug}/${sectionId}/${topicId}` },
        { label: 'Question', href: location.pathname },
      ]
    : [
        { label: 'Dashboard', href: '/' },
        { label: categoryName, href: `/prep/${categorySlug}` },
        { label: sectionName, href: `/prep/${categorySlug}/${sectionId}` },
        { label: topicName, href: `/prep/${categorySlug}/${sectionId}/${topicId}` },
        { label: 'Question', href: location.pathname },
      ];

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        <Breadcrumb path={breadcrumbPath} />
        <div
          className="animate-pulse space-y-6"
          aria-busy="true"
          aria-label="Loading question details"
        >
          {/* Metadata Skeleton */}
          <div className="flex gap-2">
            <div className="h-6 bg-bg-secondary rounded-pill w-20"></div>
            <div className="h-6 bg-bg-secondary rounded-pill w-24"></div>
            <div className="h-6 bg-bg-secondary rounded-pill w-16"></div>
          </div>

          {/* Question Skeleton */}
          <div className="space-y-3">
            <div className="h-7 bg-bg-secondary rounded w-32"></div>
            <div className="h-4 bg-bg-secondary rounded w-full"></div>
            <div className="h-4 bg-bg-secondary rounded w-11/12"></div>
            <div className="h-4 bg-bg-secondary rounded w-4/5"></div>
          </div>

          {/* Solution Skeleton */}
          <div className="border-t border-border pt-6 space-y-3">
            <div className="h-7 bg-bg-secondary rounded w-32"></div>
            <div className="h-4 bg-bg-secondary rounded w-full"></div>
            <div className="h-4 bg-bg-secondary rounded w-full"></div>
            <div className="h-4 bg-bg-secondary rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !questionData) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        <Breadcrumb path={breadcrumbPath} />
        <div
          role="alert"
          aria-live="assertive"
          className="bg-bg-primary border border-border rounded-card p-6 md:p-8 text-center space-y-4 max-w-md mx-auto my-8 shadow-sm"
        >
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Question not found
          </h1>
          <p className="text-text-secondary text-sm">
            {typeof error === 'string'
              ? error
              : error?.message || "The question you're looking for doesn't exist or has been removed."}
          </p>
          <div className="pt-2">
            <Link
              to={backUrl}
              className="inline-flex items-center justify-center px-4 py-2 bg-accent text-white font-medium rounded-pill hover:bg-accent/90 transition-colors text-sm"
            >
              Back to Question List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
      <Breadcrumb path={breadcrumbPath} />

      <MetadataRow
        difficulty={questionData.difficulty}
        companyName={questionData.company_name}
        yearAsked={questionData.year_asked}
        category={questionData.category}
        topicName={questionData.topic_name}
      />

      <QuestionBlock questionText={questionData.question_text} />

      <SolutionBlock solutionText={questionData.solution_text} />
    </main>
  );
}

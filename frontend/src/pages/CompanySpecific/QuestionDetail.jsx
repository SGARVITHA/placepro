import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCompany, getCategory, getTopic, getQuestion } from '../../data/db';
import QuestionDetailLayout from '../../components/questions/QuestionDetailLayout';

export default function QuestionDetail() {
  const { companyId, categoryId, topicId, questionId } = useParams();
  const navigate = useNavigate();

  const company = getCompany(companyId);
  const category = getCategory(companyId, categoryId);
  const topic = getTopic(companyId, categoryId, topicId);
  const question = getQuestion(companyId, categoryId, topicId, questionId);

  if (!company || !category || !topic || !question) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-bold">Question Not Found</h2>
        <p className="text-text-secondary">The requested question could not be found.</p>
        <Link to={`/companies/${companyId}/${categoryId}/${topicId}`} className="text-accent hover:underline font-medium">
          Return to Questions
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Company Specific', to: '/companies' },
    { label: company.name, to: `/companies/${company.id}` },
    { label: category.name, to: `/companies/${company.id}/${category.id}` },
    { label: topic.name, to: `/companies/${company.id}/${category.id}/${topic.id}` },
    { label: question.title }
  ];

  const tags = [
    { label: question.difficulty, type: 'difficulty' },
    { label: company.name, type: 'company' },
    { label: question.year, type: 'year' },
    { label: topic.name, type: 'topic' },
    { label: category.name, type: 'category' },
  ];

  const currentIndex = topic.questions.findIndex(q => q.id === question.id);
  const disablePrevious = currentIndex <= 0;
  const disableNext = currentIndex >= topic.questions.length - 1;

  const handlePrevious = () => {
    if (!disablePrevious) {
      const prevId = topic.questions[currentIndex - 1].id;
      navigate(`/companies/${companyId}/${categoryId}/${topicId}/${prevId}`);
    }
  };

  const handleNext = () => {
    if (!disableNext) {
      const nextId = topic.questions[currentIndex + 1].id;
      navigate(`/companies/${companyId}/${categoryId}/${topicId}/${nextId}`);
    }
  };

  return (
    <QuestionDetailLayout
      question={question}
      breadcrumbs={breadcrumbs}
      tags={tags}
      onPrevious={handlePrevious}
      onNext={handleNext}
      disablePrevious={disablePrevious}
      disableNext={disableNext}
      topicName={topic.name}
    />
  );
}

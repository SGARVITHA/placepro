import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { interviewQuestions } from '../../data/db';
import QuestionDetailLayout from '../../components/questions/QuestionDetailLayout';

export default function InterviewQuestionDetail() {
  const { type, questionId } = useParams();
  const navigate = useNavigate();

  // Normalize type
  const actualType = type.toLowerCase() === 'hr' ? 'HR' : 'Technical';
  const typeQuestions = interviewQuestions.filter(q => q.type === actualType);
  
  const question = typeQuestions.find(q => q.id === questionId);

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
        <h2 className="text-2xl font-bold">Interview Question Not Found</h2>
        <p className="text-text-secondary">The requested question could not be found.</p>
        <Link to="/interview" className="text-accent hover:underline font-medium">
          Return to Interview Preparation
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Interview', to: '/interview' },
    { label: `${actualType} Interview` },
    { label: question.title }
  ];

  const tags = [
    { label: actualType, type: 'category' },
    ...question.tags.map(tag => ({ label: tag, type: 'topic' }))
  ];

  const currentIndex = typeQuestions.findIndex(q => q.id === question.id);
  const disablePrevious = currentIndex <= 0;
  const disableNext = currentIndex >= typeQuestions.length - 1;

  const handlePrevious = () => {
    if (!disablePrevious) {
      const prevId = typeQuestions[currentIndex - 1].id;
      navigate(`/interview/${type}/${prevId}`);
    }
  };

  const handleNext = () => {
    if (!disableNext) {
      const nextId = typeQuestions[currentIndex + 1].id;
      navigate(`/interview/${type}/${nextId}`);
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
      topicName={`${actualType} Interview`}
    />
  );
}

import React from 'react';

export default function QuestionBlock({ questionText }) {
  return (
    <section aria-labelledby="question-heading" className="space-y-3">
      <h2
        id="question-heading"
        className="text-xl font-bold text-text-primary tracking-tight"
      >
        Question
      </h2>
      <div className="text-text-primary text-base md:text-lg leading-relaxed whitespace-pre-line">
        {questionText}
      </div>
    </section>
  );
}

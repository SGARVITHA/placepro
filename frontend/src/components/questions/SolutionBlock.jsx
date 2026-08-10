import React from 'react';

export default function SolutionBlock({ solutionText }) {
  return (
    <section
      aria-labelledby="solution-heading"
      className="border-t border-border pt-6 mt-6 space-y-3"
    >
      <h2
        id="solution-heading"
        className="text-xl font-bold text-text-primary tracking-tight"
      >
        Solution
      </h2>
      <div className="text-text-primary text-base md:text-lg leading-relaxed whitespace-pre-line">
        {solutionText}
      </div>
    </section>
  );
}

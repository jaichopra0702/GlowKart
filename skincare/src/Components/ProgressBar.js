import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  // Calculate the number of filled chunks
  const filledChunks = Math.min(currentQuestion, totalQuestions);

  return (
    <div className="progress-bar-container">
      {Array.from({ length: totalQuestions }).map((_, index) => (
        <div
          key={index}
          className={`progress-bar-chunk ${index < filledChunks ? 'filled' : ''}`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;

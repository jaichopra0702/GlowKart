import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const QuizStart = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/question/1'); // Navigate to the first question page
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>You know your skin. We know the science.</h1>
        <h1>So let’s get you one step closer to your</h1>
        <h2>custom remedy.</h2>
        <p>This two-minute questionnaire will help us understand your unique skin profile.</p>
      </div>
      <button className="quiz-button" onClick={handleStart}>LET'S GET STARTED</button>
    </div>
  );
};

export default QuizStart;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import questions from './questions';
import './Quiz.css';
import ProgressBar from './ProgressBar';
import Recommendations from './Recommendations';

const QuestionPage = () => {
  const { questionNumber } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const totalQuestions = questions.length;

  useEffect(() => {
    const currentQuestionNumber = parseInt(questionNumber);
    if (currentQuestionNumber) {
      const storedFormData = { ...formData };

      if (currentQuestionNumber === 1) {
        localStorage.removeItem('name');
        setName('');
        setUserAnswer('');
      } else if (currentQuestionNumber === 2) {
        const storedName = localStorage.getItem('name');
        if (storedName) {
          setName(storedName);
        }
        setEmail(storedFormData.email || '');
      } else if (currentQuestionNumber === 3) {
        setPhone(storedFormData[`question${currentQuestionNumber}`] || '');
      } else {
        setUserAnswer(storedFormData[`question${currentQuestionNumber}`] || '');
      }
    }
  }, [questionNumber, formData]);

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (event) => {
    const phoneValue = event.target.value;
    setPhone(phoneValue);

    if (!phoneValue.match(/^\d{10}$/)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneError('');
    }
  };

  const handleMCQSelection = (answer) => {
    const currentQuestionNumber = parseInt(questionNumber);
    const updatedFormData = { ...formData };

    if (currentQuestionNumber === 8) {
      // Map selected answer to category
      let category = '';
      switch (answer) {
        case 'DrySkin':
          category = 'DrySkin';
          break;
        case 'Pigmentation':
          category = 'Pigmentation';
          break;
        case 'OilySkin':
          category = 'OilySkin';
          break;
        case 'SensitiveSkin':
          category = 'SensitiveSkin';
          break;
        case 'Acne':
          category = 'Acne';
          break;
        case 'CombinationSkin':
          category = 'CombinationSkin';
          break;
        case 'TexturedSkin':
          category = 'TexturedSkin';
          break;
        default:
          category = ''; // Removed default "General" category
      }

      updatedFormData[`question${currentQuestionNumber}`] = answer;
      setSelectedCategory(category); // Set the selected category here
    } else {
      updatedFormData[`question${currentQuestionNumber}`] = answer;
    }

    setFormData(updatedFormData);
    setUserAnswer(answer);

    const nextQuestionNumber = currentQuestionNumber + 1;
    if (questions.some(q => q.id === nextQuestionNumber)) {
      navigate(`/question/${nextQuestionNumber}`);
    } else {
      // Ensure category is selected before navigation
      if (!selectedCategory) {
        setSelectedCategory('General');
      }
      navigate(`/recommendation?category=${selectedCategory}`);
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
  
    const currentQuestionNumber = parseInt(questionNumber);
    const updatedFormData = { ...formData };
  
    // Collecting answers
    if (currentQuestionNumber === 1) {
      localStorage.setItem('name', userAnswer);
      updatedFormData.name = userAnswer;
    } else if (currentQuestionNumber === 2) {
      if (emailError) return;
      updatedFormData.email = email;
    } else if (currentQuestionNumber === 8) {
      updatedFormData[`question${currentQuestionNumber}`] = userAnswer;
      console.log("Answer for Question 8:", userAnswer); // Log question 8 answer
    } else {
      updatedFormData[`question${currentQuestionNumber}`] = userAnswer;
    }
  
    setFormData(updatedFormData);
  
    // Generate Recommendations based on Question 8 answer
    let recommendations = [];
    let selectedCategory = '';
    console.log("Updated Form Data before Recommendation Logic:", updatedFormData);
  
    // Logic to populate category and recommendations based on answer from Question 8
    switch (updatedFormData[`question8`]) { // Check answer for Question 8
      case 'DrySkin':
        recommendations.push('Product for Dry Skin');
        selectedCategory = 'Dry Skin';
        break;
      case 'Pigmentation':
        recommendations.push('Product for Pigmentation');
        selectedCategory = 'Pigmentation';
        break;
      case 'OilySkin':
        recommendations.push('Product for Oily Skin');
        selectedCategory = 'Oily Skin';
        break;
      case 'SensitiveSkin':
        recommendations.push('Product for Sensitive Skin');
        selectedCategory = 'Sensitive Skin';
        break;
      case 'Acne':
        recommendations.push('Acne Treatment Products');
        selectedCategory = 'Acne';
        break;
      default:
        selectedCategory = 'General';
        break;
    }
  
    console.log("Recommendations generated:", recommendations);
  
    // Create quizData to submit
    const quizData = {
      name: updatedFormData.name, // Ensure name is included
      email: updatedFormData.email, // Ensure email is included
      phone: updatedFormData.phone, // Include phone if provided
      answers: Object.keys(updatedFormData)
        .filter(key => key.startsWith('question'))
        .map(key => updatedFormData[key]),
      category: selectedCategory,  // Dynamic category from Question 8 answer
      recommendations,  // Dynamic recommendations based on the answer
    };
  
    console.log("Quiz Data before Submission:", quizData);
    submitQuiz(quizData);
  
    const nextQuestionNumber = currentQuestionNumber + 1;
    if (questions.some(q => q.id === nextQuestionNumber)) {
      navigate(`/question/${nextQuestionNumber}`);
    } else {
      navigate(`/recommendation?category=${selectedCategory}`);
    }
  };
  
  // Refactored submitQuiz function
  const submitQuiz = async (quizData) => {
    try {
      // Ensure the email is provided in the quiz data
      if (!quizData.email) {
        console.error('Email is required');
        return; // Stop submission if email is missing
      }
  
      const response = await fetch('http://localhost:5001/api/quiz/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
  
      const result = await response.json();
      console.log(result);  // Log response message from backend
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  
  

  

  const handleBack = () => {
    const previousQuestionNumber = parseInt(questionNumber) - 1;
    if (questions.some(q => q.id === previousQuestionNumber)) {
      navigate(`/question/${previousQuestionNumber}`);
    }
  };

  const handleSkip = () => {
    const currentQuestionNumber = parseInt(questionNumber);
    const nextQuestionNumber = currentQuestionNumber + 1;
    if (questions.some(q => q.id === nextQuestionNumber)) {
      navigate(`/question/${nextQuestionNumber}`);
    } else {
      axios.post('http://localhost:5001/api/quiz/submit-quiz', formData)
        .then(response => {
          console.log('Success:', response.data);
          navigate('/thank-you');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const currentQuestion = questions.find(q => q.id === parseInt(questionNumber));

  if (!currentQuestion) {
    return <p>Question not found.</p>;
  }

  const getStyledPrompt = (prompt) => {
    if (prompt.includes('<br />')) {
      const [beforeBr, afterBr] = prompt.split('<br />');
      return `<span class="prompt-before-br">${beforeBr.trim()}</span><br /><span class="prompt-after-br">${afterBr.trim()}</span>`;
    }
    return `<span class="prompt-before-br">${prompt.trim()}</span>`;
  };

  const placeholderText = currentQuestion.id === 2 && name 
    ? getStyledPrompt(currentQuestion.prompt.replace('{name}', name))
    : getStyledPrompt(currentQuestion.prompt);

  return (
    <div className="quiz-container1">
      <ProgressBar currentQuestion={parseInt(questionNumber)} totalQuestions={totalQuestions} />
      <div className="quiz-inner-container">
        <div className="quiz-header">
          <h2 dangerouslySetInnerHTML={{ __html: placeholderText }} />
        </div>
        <form onSubmit={handleSubmit}>
          {currentQuestion.id === 1 ? (
            <input
              type="text"
              value={userAnswer}
              placeholder="Your First Name"
              onChange={handleInputChange}
            />
          ) : currentQuestion.id === 2 ? (
            <div>
              <input
                type="text"
                value={email}
                placeholder="Your Email ID"
                onChange={handleEmailChange}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
          ) : currentQuestion.id === 3 ? (
            <div>
              <input
                type="text"
                value={phone}
                placeholder="Phone Number (Optional)"
                onChange={handlePhoneChange}
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
            </div>
          ) : (
            currentQuestion.answers ? (
              <div className="mcq-options">
                {currentQuestion.answers.map(answer => (
                  <button
                    key={answer}
                    type="button"
                    className={`mcq-button ${userAnswer === answer ? 'selected' : ''}`}
                    onClick={() => handleMCQSelection(answer)}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={userAnswer}
                placeholder="Your answer here"
                onChange={handleInputChange}
              />
            )
          )}
          <div className="button-container">
            {parseInt(questionNumber) > 1 && (
              <button type="button" className="quiz-button1 back-button" onClick={handleBack}>
                ← BACK
              </button>
            )}
            {currentQuestion.id === 3 && (
              <button type="button" className="quiz-button1 skip-button" onClick={handleSkip}>
                SKIP →
              </button>
            )}
            <button className="quiz-button1 next-button" type="submit" disabled={!userAnswer && !email && !phone}>
              NEXT →
            </button>
          </div>
        </form>
      </div>
      {parseInt(questionNumber) > totalQuestions && selectedCategory && (
        <Recommendations selectedCategory={selectedCategory} />
      )}
    </div>
  );
};

export default QuestionPage;

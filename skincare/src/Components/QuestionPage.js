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
    console.log("useEffect triggered for questionNumber:", questionNumber);

    const currentQuestionNumber = parseInt(questionNumber);
    console.log("Parsed questionNumber:", currentQuestionNumber);

    if (currentQuestionNumber) {
      const storedFormData = { ...formData };
      console.log("Stored FormData at useEffect start:", storedFormData);

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
    console.log("User Answer Updated:", event.target.value);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    console.log("Email Updated:", emailValue);

    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (event) => {
    const phoneValue = event.target.value;
    setPhone(phoneValue);
    console.log("Phone Updated:", phoneValue);

    if (!phoneValue.match(/^\d{10}$/)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneError('');
    }
  };

  const handleMCQSelection = (answer) => {
    console.log("MCQ Answer Selected:", answer);
    const currentQuestionNumber = parseInt(questionNumber);
    console.log("Current Question Number in handleMCQSelection:", currentQuestionNumber);

    const updatedFormData = { ...formData };
    updatedFormData[`question${currentQuestionNumber}`] = answer;

    if (currentQuestionNumber === 8) {
        let category = '';
        
        const categoryMap = {
            'DrySkin': 'DrySkin',
            'Pigmentation': 'Pigmentation',
            'OilySkin': 'OilySkin',
            'SensitiveSkin': 'SensitiveSkin',
            'Acne': 'Acne'
        };

        category = categoryMap[answer] || 'General';
        
        setSelectedCategory(category);
        console.log("Selected Category Set:", category);
    }

    setFormData(updatedFormData);
    
    
    
};

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    console.log("handleSubmit triggered");
  
    const currentQuestionNumber = parseInt(questionNumber);
    console.log("Current Question Number in handleSubmit:", currentQuestionNumber);
  
    const updatedFormData = { ...formData };
  
    // Handle different question numbers
    if (currentQuestionNumber === 1) {
      localStorage.setItem('name', userAnswer);
      updatedFormData.name = userAnswer;
    } else if (currentQuestionNumber === 2) {
      if (emailError) return;
      updatedFormData.email = email;
    } else if (currentQuestionNumber === 3) {
      updatedFormData.phone = userAnswer;
    } 
  
    // Special handling for skin type question
    if (currentQuestionNumber === 8) {
      updatedFormData[`question${currentQuestionNumber}`] = userAnswer;
      console.log("Answer for Question 8:", userAnswer);
  
      // Generate recommendations based on skin type
      const recommendationMap = {
        'DrySkin': [
          'Ultra Moisturizing Cream for Dry Skin', 
          'Hydrating Serum for Dry Skin'
        ],
        'Pigmentation': [
          'Brightening Vitamin C Serum', 
          'Dark Spot Corrector Cream'
        ],
        'OilySkin': [
          'Oil-Control Mattifying Gel', 
          'Deep Cleansing Foaming Face Wash'
        ],
        'SensitiveSkin': [
          'Soothing Aloe Vera Gel', 
          'Gentle Hydrating Facial Mist'
        ],
        'Acne': [
          'Acne Treatment Gel', 
          'Benzoyl Peroxide Face Wash'
        ],
        'default': [
          'General Skin Care Cream', 
          'Hydrating Face Mask'
        ]
      };
  
      const recommendations = recommendationMap[userAnswer] || recommendationMap['default'];
      console.log("Recommendations generated:", recommendations);
  
      // Collect all answers for submission
      const allAnswers = Object.keys(updatedFormData)
        .filter(key => key.startsWith('question'))
        .map(key => updatedFormData[key])
        .filter(answer => answer !== undefined);
  
      const quizData = {
        name: updatedFormData.name || '',
        email: updatedFormData.email || '',
        phone: updatedFormData.phone || '',
        answers: allAnswers,
        category: selectedCategory || 'General',
        recommendations,
      };
  
      console.log("Quiz Data before Submission:", quizData);
      submitQuiz(quizData);
    } else {
      // Store current question's answer
      updatedFormData[`question${currentQuestionNumber}`] = userAnswer;
    }
  
    // Update form data state
    setFormData(updatedFormData);
    console.log("FormData after submit:", updatedFormData);
  
    // Navigate to next question or recommendation page
    const nextQuestionNumber = currentQuestionNumber + 1;
    if (questions.some(q => q.id === nextQuestionNumber)) {
      navigate(`/question/${nextQuestionNumber}`);
    } else {
      navigate(`/recommendation?category=${selectedCategory || 'General'}`);
    }
  };
  
  const submitQuiz = async (quizData) => {
    try {
      console.log("Submitting Complete Quiz Data:", JSON.stringify(quizData, null, 2));
  
      const response = await fetch('http://localhost:5001/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
  
      // Check response status first
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Server Error Response:', errorBody);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse server response
      const result = await response.json();
      console.log("Successful Server Response:", result);
  
      // Optional: Fetch and log all quizzes (for verification)
      
  
      return result;
    } catch (error) {
      console.error('FULL Quiz Submission Error:', {
        message: error.message,
        stack: error.stack
      });
      throw error; // Re-throw to allow caller to handle
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
      axios.post('http://localhost:5001/api/quiz/submit', formData)
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

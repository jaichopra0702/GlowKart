import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import questions from './questions';
import './Quiz.css'; 
import ProgressBar from './ProgressBar'; 

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

  const totalQuestions = questions.length;

  useEffect(() => {
    const currentQuestionNumber = parseInt(questionNumber);
    if (currentQuestionNumber) {
      const storedFormData = { ...formData };

      if (currentQuestionNumber === 1) {
        localStorage.removeItem('name'); // Clear name from localStorage to avoid auto-fill
        setName(''); // Clear name state to avoid pre-filling
        setUserAnswer(''); // Clear userAnswer for question 1
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

    // Validate email
    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (event) => {
    const phoneValue = event.target.value;
    setPhone(phoneValue);

    // Validate phone number
    if (!phoneValue.match(/^\d{10}$/)) { // Assuming 10-digit phone numbers
      setPhoneError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneError('');
    }
  };

  const handleMCQSelection = (answer) => {
    const currentQuestionNumber = parseInt(questionNumber);
    const updatedFormData = { ...formData };

    if (currentQuestionNumber === 1) {
      localStorage.setItem('name', answer);
      updatedFormData.name = answer;
    } else if (currentQuestionNumber === 2) {
      updatedFormData.email = email;
    } else {
      updatedFormData[`question${currentQuestionNumber}`] = answer;
    }

    setFormData(updatedFormData);
    setUserAnswer(answer);

    // Automatically submit data to the backend
    axios.post('http://localhost:5000/submit-quiz', updatedFormData)
      .then(response => {
        console.log('Success:', response.data);

        // Navigate to the next question
        const nextQuestionNumber = currentQuestionNumber + 1;
        if (questions.some(q => q.id === nextQuestionNumber)) {
          navigate(`/question/${nextQuestionNumber}`);
        } else {
          navigate('/thank-you');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    const currentQuestionNumber = parseInt(questionNumber);
    const updatedFormData = { ...formData };

    if (currentQuestionNumber === 1) {
      localStorage.setItem('name', userAnswer);
      updatedFormData.name = userAnswer;
    } else if (currentQuestionNumber === 2) {
      if (emailError) {
        return; // Prevent submission if email is invalid
      }
      updatedFormData.email = email;
    } else if (currentQuestionNumber === 3) {
      if (phoneError) {
        return; // Prevent submission if phone number is invalid
      }
      updatedFormData[`question${currentQuestionNumber}`] = phone;
    } else {
      updatedFormData[`question${currentQuestionNumber}`] = userAnswer;
    }

    setFormData(updatedFormData);

    console.log('Form Data Before Submit:', updatedFormData);

    // Clear the input fields
    setUserAnswer('');
    setEmail('');
    setPhone('');

    // Handle navigation
    const nextQuestionNumber = currentQuestionNumber + 1;
    if (questions.some(q => q.id === nextQuestionNumber)) {
      navigate(`/question/${nextQuestionNumber}`);
    } else {
      axios.post('http://localhost:5000/submit-quiz', updatedFormData)
        .then(response => {
          console.log('Success:', response.data);
          navigate('/thank-you');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleBack = () => {
    const previousQuestionNumber = parseInt(questionNumber) - 1;
    if (questions.some(q => q.id === previousQuestionNumber)) {
      navigate(`/question/${previousQuestionNumber}`);
    }
  };

  const handleSkip = () => {
    // Move to the next question when skipping
    const currentQuestionNumber = parseInt(questionNumber);
    const nextQuestionNumber = currentQuestionNumber + 1;
    if (questions.some(q => q.id === nextQuestionNumber)) {
      navigate(`/question/${nextQuestionNumber}`);
    } else {
      axios.post('http://localhost:5000/submit-quiz', formData)
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
    </div>
  );
};

export default QuestionPage;

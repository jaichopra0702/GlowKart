import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import image from './glowcart-removebg-preview.png';
import image2 from './login.jpg';

function Login() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputFocus = (e) => {
    e.target.classList.add('active');
  };

  const handleInputBlur = (e) => {
    if (e.target.value === '') {
      e.target.classList.remove('active');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setErrorMessage(''); // Clear any error messages when switching modes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const endpoint = isSignUpMode ? '/registeruser' : '/loginuser';

    try {
      const response = await fetch(`https://glowkart-backend.onrender.com/user${endpoint}`, {
        method: 'POST',
        credentials: 'include', // Ensure cookies (session ID) are included in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isSignUpMode) {
        // After successful registration, switch to login mode
        setIsSignUpMode(false);
        setFormData({ name: '', email: '', password: '' });
        alert('Registration successful! Please login with your credentials.');
      } else {
        // After successful login, navigate to the home page
        navigate('/'); // Session ID is handled automatically by the cookie
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-css">
      <main className={isSignUpMode ? 'sign-up-mode' : ''}>
        <div className="box12">
          <div className="inner-box">
            <div className="forms-wrap">
              {errorMessage && (
                <div
                  className="error-message"
                  style={{ color: 'red', textAlign: 'center', padding: '10px' }}
                >
                  {errorMessage}
                </div>
              )}
              <form
                className={`sign-in-form ${isSignUpMode ? 'hidden' : ''}`}
                onSubmit={handleSubmit}
              >
                <div className="logo">
                  <img src={image} alt="selfcare" />
                </div>
                <div className="heading">
                  <h3>Sign In</h3>
                  <h6>Don't have an account?</h6>
                  <button type="button" className="toggle" onClick={toggleMode}>
                    Sign up
                  </button>
                </div>

                <div className="actual-form">
                  <div className="input-wrap">
                    <input
                      type="name"
                      className="input-field"
                      autoComplete="off"
                      name="name"
                      value={formData.name}
                      required
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <label>Name</label>
                  </div>
                  <div className="input-wrap">
                    <input
                      type="email"
                      className="input-field"
                      autoComplete="off"
                      name="email"
                      value={formData.email}
                      required
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <label>Email</label>
                  </div>
                  <div className="input-wrap">
                    <input
                      type="password"
                      minLength="4"
                      className="input-field"
                      autoComplete="off"
                      name="password"
                      value={formData.password}
                      required
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <label>Password</label>
                  </div>
                  <button
                    type="submit"
                    className="sign-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Please wait...' : 'Sign In'}
                  </button>
                </div>
              </form>
              <form
                className={`sign-up-form ${isSignUpMode ? '' : 'hidden'}`}
                onSubmit={handleSubmit}
              >
                <div className="logo">
                  <img src={image} alt="easyclass" />
                </div>
                <div className="heading">
                  <h3>Sign Up</h3>
                  <h6>Already have an account?</h6>
                  <button type="button" className="toggle" onClick={toggleMode}>
                    Sign in
                  </button>
                </div>
                <div className="actual-form">
                  <div className="input-wrap">
                    <input
                      type="text"
                      minLength="4"
                      className="input-field"
                      autoComplete="off"
                      name="name"
                      value={formData.name}
                      required
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <label>Name</label>
                  </div>
                  <div className="input-wrap">
                    <input
                      type="email"
                      className="input-field"
                      autoComplete="off"
                      name="email"
                      value={formData.email}
                      required
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <label>Email</label>
                  </div>
                  <div className="input-wrap">
                    <input
                      type="password"
                      minLength="4"
                      className="input-field"
                      autoComplete="off"
                      name="password"
                      value={formData.password}
                      required
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <label>Password</label>
                  </div>
                  <button
                    type="submit"
                    className="sign-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Please wait...' : 'Sign Up'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="carousel">
            <div className="images">
              <img src={image2} alt="login" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;

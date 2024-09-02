import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
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

  const navigate = useNavigate(); // Initialize useNavigate

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isSignUpMode ? '/signup' : '/login'; // Adjust endpoint based on form mode
    fetch(`http://localhost:7000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.message === 'Login successful' || data.message === 'User data saved successfully') {
          navigate('/'); // Redirect to homepage
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="login-css">
      <main className={isSignUpMode ? 'sign-up-mode' : ''}>
        <div className="box12">
          <div className="inner-box">
            <div className="forms-wrap">
              <form
                className={`sign-in-form ${isSignUpMode ? 'hidden' : ''}`}
                onSubmit={handleSubmit}
              >
                <div className="logo">
                  <img src={image} alt="selfcare" />
                </div>
                <div className="heading">
                  <h3>Sign In</h3>
                  <h6>Don't have an account?  </h6>
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
                      required
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={handleInputChange}
                    />
                    <label>Password</label>
                  </div>
                  <input type="submit" value="Sign In" className="sign-btn" />
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
                  <button className="toggle" onClick={toggleMode}>
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
                  <input type="submit" value="Sign Up" className="sign-btn" />
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

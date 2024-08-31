import React, { useEffect, useState } from 'react';
import './login.css';
import image from './glowcart-removebg-preview.png'
import image2 from './login.jpg'

function Login() {
  
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleInputFocus = (e) => {
    e.target.classList.add('active');
  };

  const handleInputBlur = (e) => {
    if (e.target.value === '') {
      e.target.classList.remove('active');
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const showNextImage = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  useEffect(() => {
      const showSlides = () => {
        const slides = document.getElementsByClassName('slides');
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';
        }
        const index = slideIndex;
        slides[index].style.display = 'block';
      };

      setInterval(showNextImage, 3000);
      setInterval(showSlides, 2000);
  },[]);

  return (
    <div className='login-css'>
    <main className={isSignUpMode ? 'sign-up-mode' : ''}>
      <div className="box12">
        <div className="inner-box">
          <div className="forms-wrap">
            <form action="index.html" autoComplete="off" className="sign-in-form">
              <div className="logo">
                <img src={image} alt="selfcare" />
              </div>
              <div className="heading">
                <h3>Create an Account</h3>
                <h6>Not registered yet?</h6>
                <button className="toggle" onClick={toggleMode}>
                  Sign up
                </button>
              </div>
              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <label>Name</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="email"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    id="email"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <label>Email</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="password"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <label>Password</label>
                </div>
                <input type="submit" value="Sign In" className="sign-btn" />
                <p className="text">
                  Forgot your password or login details?
                  <br />
                  <a href="/">Get help</a> signing in
                </p>
              </div>
            </form>
            <form action="index.html" autoComplete="off" className="sign-up-form">
              <div className="logo">
                <img src={image} alt="easyclass" />
              </div>
              <div className="heading">
                <h2>Get Started</h2>
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
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <label>Name</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="email"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <label>Email</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="password"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  <label>Password</label>
                </div>
                <input type="submit" value="Sign Up" className="sign-btn" />
                <p className="text">
                  By signing up, I agree to the
                  <a href="/">Terms of Services</a> and
                  <a href="/">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>
          <div className="carousel">
            <div className="slideshow-container">
              <div className="slides">
                <img src={image2} alt="Slide 1" />
              </div>
              <div className="slides">
                <img src={image2} alt="Slide 2" />
              </div>
            </div>
          </div>
          <div className="text-slider">
            <div className="text-wrap"></div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}

export default Login;

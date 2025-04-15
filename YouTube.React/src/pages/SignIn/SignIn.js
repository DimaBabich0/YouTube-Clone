import './SignIn.css';
import React, { useState } from 'react';
import PhotoSlider from './Component/PhotoSlider/PhotoSlider';
import { Link } from 'react-router-dom';

import SignPhoto1 from './Images/SignPhoto1.png';
import SignPhoto2 from './Images/SignPhoto2.png';
import SignPhoto3 from './Images/SignPhoto3.png';
import SignPhoto4 from './Images/SignPhoto4.png';
import SignPhoto5 from './Images/SignPhoto5.png';
import SignPhoto6 from './Images/SignPhoto6.png';
import SignPhoto7 from './Images/SignPhoto7.png';

import iconFacebook from './Images/icon-facebook.svg';
import iconGoogle from './Images/icon-google.svg';
import iconTwitter from './Images/icon-twitter.svg';
import iconApple from './Images/icon-apple.svg';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const Photos = [
    [SignPhoto1, SignPhoto2, SignPhoto3],
    [SignPhoto4, SignPhoto5, SignPhoto6],
    [SignPhoto7, SignPhoto1, SignPhoto3]
  ];

  const sendToDatabase = async (email, password) => {
    try {
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        setErrorMessage('');
        // можно сделать редирект или сохранить токен
      } else {
        console.error('Login failed:', data);
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('AJAX error:', error);
      setErrorMessage('Something went wrong. Try again later.');
    }
  };

  const handleButtonClick = () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    sendToDatabase(email, password);
  };

  return (
    <div className='page'>
      <div className='photos'>
        <PhotoSlider sources={Photos[0]} />
        <PhotoSlider sources={Photos[1]} />
        <PhotoSlider sources={Photos[2]} />
      </div>

      <div className='block'>
        <div>
          <h1 className='mainText'>
            get some<br />
            felicity<br />
            with <span className='specialText'>amtlis</span><br />
          </h1>
        </div>

        <label>
          <div>
            <input
              className='input'
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='passwordSection'>
            <input
              className='input'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className="link" href="#">Forgot your password?</a>
          </div>
        </label>

        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className='bottomSection'>
          <div className='logoSection'>
            <a href=""><img src={iconFacebook} alt="Facebook" /></a>
            <a href=""><img src={iconGoogle} alt="Google" /></a>
            <a href=""><img src={iconTwitter} alt="Twitter" /></a>
            <a href=""><img src={iconApple} alt="Apple" /></a>
          </div>
          <button className='sign-in-button' onClick={handleButtonClick}>
            <p className='text'>Sign in</p>
          </button>
        </div>

        <Link className='flex-center' to='/sign-up'>
          <a className="link" href="#"><p className='text'>Create an account</p></a>
        </Link>
        <br />
      </div>
    </div>
  );
}

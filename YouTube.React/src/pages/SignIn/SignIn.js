import './SignIn.css';
import React, { useState } from 'react';
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // State to manage error message visibility

  const Photos = [
    ["./images/sign-page/SignPhoto1.png", "./images/sign-page/SignPhoto2.png", "./images/sign-page/SignPhoto3.png"],
    ["./images/sign-page/SignPhoto4.png", "./images/sign-page/SignPhoto5.png", "./images/sign-page/SignPhoto6.png"],
    ["./images/sign-page/SignPhoto7.png", "./images/sign-page/SignPhoto1.png", "./images/sign-page/SignPhoto3.png"]
  ];

  const handleSignIn = async () => {
    if (email && password) {
      try {
        const response = await fetch('/api/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          // Handle successful login (e.g., redirect to another page or show success message)
          console.log('Login successful:', data);
          setErrorMessage(''); // Clear error message on success
        } else {
          // Handle error response
          console.error('Error logging in:', data);
          setErrorMessage('Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('Network error:', error);
        setErrorMessage('Something went wrong. Please try again later.');
      }
    } else {
      setErrorMessage('Please enter both email and password.');
    }
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

        {/* Error message displayed when needed */}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className='bottomSection'>
          <div className='logoSection'>
            <a href=""><img src='./images/sign-page/icon-facebook.svg' alt="Facebook" /></a>
            <a href=""><img src='./images/sign-page/icon-google.svg' alt="Google" /></a>
            <a href=""><img src='./images/sign-page/icon-twitter.svg' alt="Twitter" /></a>
            <a href=""><img src='./images/sign-page/icon-apple.svg' alt="Apple" /></a>
          </div>
          <button className='sign-in-button' onClick={handleSignIn}>
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

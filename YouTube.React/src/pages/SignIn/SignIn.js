import './SignIn.css';
import React, { useState } from 'react';
import PhotoSlider from './Component/PhotoSlider/PhotoSlider';
import { Link, useNavigate } from 'react-router-dom';

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

const Photos = [
  [SignPhoto1, SignPhoto2, SignPhoto3],
  [SignPhoto4, SignPhoto5, SignPhoto6],
  [SignPhoto7, SignPhoto1, SignPhoto3]
];

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMessage: ''
  });

  // Обработчик для изменения данных формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errorMessage: '' // Очищаем ошибку при изменении данных
    }));
  };

  const sendToDatabase = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: 'Please enter both email and password.'
      }));
      return;
    }

    try {
      const response = await fetch('http://localhost:5103/Sign/In', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      let text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        data = { message: text };
      }

      if (response.ok) {
        navigate('/');
      } else {
        const errorMessages = data.errors ? Object.entries(data.errors).map(([field, messages]) => messages.map(msg => `${msg}`)).flat() : [data.message || 'Something went wrong.'];

        setFormData((prev) => ({
          ...prev,
          errorMessage: errorMessages.join(' ')
        }));
      }
    } catch (error) {
      console.log('Sign-in error:', error);
      setFormData((prev) => ({
        ...prev,
        errorMessage: 'Server error. Please try again later.'
      }));
    }
  };


  const handleButtonClick = () => {
    sendToDatabase();
  };

  return (
    <div className='page'>
      <div className='photos'>
        {Photos.map((photoSet, index) => (
          <PhotoSlider key={index} sources={photoSet} />
        ))}
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
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='passwordSection'>
            <input
              className='input'
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <a className="link" href="/">Forgot your password?</a>
          </div>
        </label>

        {formData.errorMessage && (
          <div className="error-message">
            <p>{formData.errorMessage}</p>
          </div>
        )}

        <div className='bottomSection'>
          <div className='logoSection'>
            <a href=""><img src={iconFacebook} alt="Facebook" /></a>
            <a href=""><img src={iconGoogle} alt="Google" /></a>
            <a href=""><img src={iconTwitter} alt="Twitter" /></a>
            <a href=""><img src={iconApple} alt="Apple" /></a>
          </div>
          <button className='sign-in-button' type="button" onClick={handleButtonClick}>
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

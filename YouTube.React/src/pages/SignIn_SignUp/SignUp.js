import './SignUp.css';
import React, { useState } from 'react';
import PhotoSlider from './Component/PhotoSlider/PhotoSlider.js';
import { useNavigate } from 'react-router-dom';
import SocialIcons from './Component/SocialIcons/SocialIcons';

import icon_Arrow from './Images/icon_arrow_insert.svg';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errorMessage: '' // Очистить ошибку при изменении данных
    }));
  };

  const sendToDatabase = async () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: 'Please fill in all fields.'
      }));
      return;
    }

    if (password !== confirmPassword) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: 'Passwords do not match.'
      }));
      return;
    }

    try {
      const response = await fetch('http://localhost:5103/Sign/Up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      let text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        data = { message: text };
      }

      if (response.ok) {
        navigate("/");
      } else {
        const errorMessages = data.errors ? Object.entries(data.errors).map(([field, messages]) => messages.map(msg => `${msg}`)).flat() : [data.message || 'Something went wrong.'];

        setFormData((prev) => ({
          ...prev,
          errorMessage: errorMessages || 'Something went wrong. Try again.'
        }));
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setFormData((prev) => ({
        ...prev,
        errorMessage: 'Server error. Please try again later.'
      }));
    }
  };

  const handleSignUpClick = () => {
    sendToDatabase();
  };

  return (
    <div className='page'>
      <div className='photos'>
        <PhotoSlider />
      </div>

      <div className='block'>
        <div>
          <button onClick={() => navigate('/sign-in')} className="back-button">
            <img src={icon_Arrow} alt="Back" />
          </button>
        </div>

        <div>
          <h1 className='mainText'>
            Create<br />
            an account
          </h1>
        </div>

        <label>
          <div className='inputSection'>
            <input
              className='input'
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className='input'
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='inputSection'>
            <input
              className='input'
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className='input'
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </label>

        {formData.errorMessage && (
          <div className="error-message">
            <p>{formData.errorMessage}</p>
          </div>
        )}

        <div className='bottomSection'>
        <SocialIcons />
          <button className='log-in-button' onClick={handleSignUpClick}>
            <p className='text'>Sign Up</p>
          </button>
        </div>

        <div className='flex-center'>
          <a href="http://localhost:3000/" className='link'><p className='text'>Welcome to AMTLIS</p></a>
        </div>
        <br />
      </div>   
    </div>
  );
}

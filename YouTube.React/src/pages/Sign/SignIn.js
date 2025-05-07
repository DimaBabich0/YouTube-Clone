import './Sign.css';
import React, { useState } from 'react';
import PhotoSlider from './Component/PhotoSlider/PhotoSlider.js';
import { Link, useNavigate } from 'react-router-dom';
import SocialIcons from './Component/SocialIcons/SocialIcons';
import Cookies from 'js-cookie';

export default function SignIn() {
  Cookies.remove('username');
  const navigate = useNavigate();

  // Храним данные формы для авторизации (email, password) и текст ошибки
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

  // Проверка формы и отправка данных на сервер для авторизации
  const sendToDatabase = async () => {
    const { email, password } = formData;

    // Проверка на наличие введённых данных в поля email и password
    if (!email || !password) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: 'Please enter both email and password.'
      }));
      return;
    }

    // Отправка данных на сервер для авторизации пользователя
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
        Cookies.set('username', data.message);
        alert("You are logged into your account");
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        const errorMessages = data.errors ? Object.entries(data.errors).map(([field, messages]) => messages.map(msg => `${msg}`)).flat() : [data.message || 'Something went wrong.'];
        // Обработка и вывод ошибок, если сервер вернул их
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

  // Запуск процесса авторизации по клику на кнопку "Sign in"
  const handleButtonClick = () => {
    sendToDatabase();
  };

  return (
    // Слайдер фотографий на странице входа
    <div className='page'>
      <div className='photos'>
        <PhotoSlider />
      </div>

      <div className='block'>
        <h1 className='mainText'>
          get some<br />
          felicity<br />
          with <span className='specialText'>amtlis</span><br />
        </h1>

        <label>
          <div className='emailSection'>
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
          <SocialIcons />
          <button className='log-button' type="button" onClick={handleButtonClick}>
            <p className='text'>Sign in</p>
          </button>
        </div>

        <Link className='flex-center' to='/sign-up'>
          <a className="link" href="#"><p className='text'>Create an account</p></a>
        </Link>
      </div>
    </div>
  );
}

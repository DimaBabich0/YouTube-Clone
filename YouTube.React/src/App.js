import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios'; // добавил axios
import pages from './PagesPaths';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
// import NavbarMobile from './components/NavbarMobile/NavbarMobile';

function App() {
  return (
    <Router>
      <RouterApp />
    </Router>
  );
}

function RouterApp() {
  const location = useLocation();
  const noHeader = ['/sign-in', '/sign-up'];

  const showHeader = !noHeader.includes(location.pathname);
  const showNavbar = showHeader;

  const [weatherData, setWeatherData] = useState(null); // состояние для данных

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:5133/video:1');
      console.log(response.data);
      setWeatherData(response.data); // сохраним ответ
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showHeader && <Header />}
      <div className="container">
        {showNavbar && <Sidebar />}
        <Routes>
          {pages.map((page, index) => (
            <Route key={index} path={page.path} element={<page.component />} />
          ))}
        </Routes>

        {/* Выведем данные где-нибудь для примера */}
        {weatherData && (
          <div className="api-data">
            <h2>Данные с сервера:</h2>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

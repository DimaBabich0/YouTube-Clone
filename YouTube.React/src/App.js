import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import pages from './PagesPaths';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
// import NavbarMobile from './components/NavbarMobile/NavbarMobile';

function App() {
  const [userData, setUserData] = useState(Cookies.get('username')); 
  
  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      fetch(`http://localhost:5103/Users/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
          }
          return response.json();
        })
        .then(data => {
          data.profilePicture = 'http://localhost:5103' + data.profilePicture;
          setUserData(data);
        })
        .catch(error => {
          console.error('Ошибка при получении данных пользователя:', error);
          setUserData(null);
        });
    } else {
      setUserData(null);
    }
  }, []);

  return (
    <Router>
      <RouterApp userData={userData} />
    </Router>
  );
}

function RouterApp({ userData }) {
  const location = useLocation();
  const noHeader = ['/sign-in', '/sign-up'];

  const showHeader = !noHeader.includes(location.pathname);
  const showNavbar = showHeader;

  return (
    <>
      {showHeader && <Header userData={userData} />}
      <div className="container">
        {showNavbar && <Sidebar userData={userData} />}
        <Routes>
          {pages.map((page, index) => (
            <Route key={index} path={page.path} element={<page.component />} />
          ))}
        </Routes>
      </div>
    </>
  );
}

export default App;

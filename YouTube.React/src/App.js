import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, matchPath } from 'react-router-dom';
import Cookies from 'js-cookie';
import pages from './PagesPaths';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
// import NavbarMobile from './components/NavbarMobile/NavbarMobile';

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          data.picturePath = 'http://localhost:5103' + data.picturePath;
          setUserData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Ошибка при получении данных пользователя:', error);
          setUserData(null);
          setIsLoading(false);
        });
    } else {
      setUserData(null);
      setIsLoading(false);
    }
  }, []);

  return (
    <Router>
      <RouterApp userData={userData} isLoading={isLoading} />
    </Router>
  );
}

function RouterApp({ userData, isLoading }) {
  const location = useLocation();
  const path = location.pathname;

  const noHeader = ['/sign-in', '/sign-up'];
  const noNavbar = ['/sign-in', '/sign-up', '/channel/:id/studio'];

  const shouldHideHeader = noHeader.some((pattern) => matchPath(pattern, path));
  const shouldHideNavbar = noNavbar.some((pattern) => matchPath(pattern, path));

  const showHeader = !shouldHideHeader;
  const showNavbar = !shouldHideNavbar;

  if (isLoading) return null;

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

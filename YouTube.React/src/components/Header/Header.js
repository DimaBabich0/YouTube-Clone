import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import dropdownSections from './DropdownProfile';

export default function Header({ userData }) {
  const resizedLogoWidth = 950;
  const [isResized, setIsResized] = useState(window.innerWidth < resizedLogoWidth);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSectionsVisible, setIsSectionsVisible] = useState(true);
  const [isMiddleResized, setIsMiddleResized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyResized = window.innerWidth < resizedLogoWidth;
      setIsResized(isCurrentlyResized);

      if (!isCurrentlyResized) {
        setIsSectionsVisible(true);
        setIsMiddleResized(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleSections = () => {
    if (isResized) {
      setIsSectionsVisible(!isSectionsVisible);
      setIsMiddleResized(!isMiddleResized);
    }
  };

  const handleForwardClick = () => {
    setIsMiddleResized(false);
    setIsSectionsVisible(true);
  };

  const renderItems = (sections, userData) => {
    return sections.map((section, sectionIndex) => {
      if (section.type === 'profile' && userData) {
        return (
          <div className='section profile' key={sectionIndex}>
            <img className='dropdownProfilePicture' src={userData.profilePicture || '/images/header-images/acc.svg'} alt={userData.userName} />
            <div>
              <h1 className='channel-name'>{userData.channelName}</h1>
              <p className='user-name'>{'@' + userData.username}</p>
            </div>
          </div>
        );
      }

      return (
        <div className='section' key={sectionIndex}>
          {section.items.map((item, itemIndex) => {
            if (item.path) {
              return (
                <Link to={item.path} key={itemIndex} className='dropdown-item'>
                  <img src={item.src} alt={item.alt} />
                  <p>{item.text}</p>
                  {item.arrow && <img className='arrow' src='/images/header-images/arrow_forward_ios.svg' alt='Arrow' />}
                </Link>
              );
            } else {
              return (
                <div className='dropdown-item' key={itemIndex}>
                  <img className='pfp' src={item.src} alt={item.alt} />
                  <p>{item.text}</p>
                  {item.arrow && <img className='arrow' src='/images/header-images/arrow_forward_ios.svg' alt='Arrow' />}
                </div>
              );
            }
          })}
        </div>
      );
    });
  };

  return (
    <div>
      <div className='header'>
        {isSectionsVisible && (
          <div className='section left'>
            <Link to='/'>
              <img
                className='logo'
                src={isResized ? '/images/header-images/logo-mobile.svg' : '/images/header-images/logo.svg'}
                alt='Logo'
              />
            </Link>
          </div>
        )}

        <div className={`section middle ${isMiddleResized ? 'resize' : ''}`}>
          <div className='minimize-body' onClick={handleForwardClick}>
            <img
              src='./images/header-images/forward.svg'
              alt='Video'
              className='minimize-icon'
            />
          </div>
          <div className='input-container'>
            <img className='icon-search' src='/images/header-images/search.svg' alt='Mic' />
            <input className={`input-search ${isMiddleResized ? 'resize' : ''}`} type='text' name='search' placeholder="Search" />
          </div>
          <img className='icon-mic' src='/images/header-images/mic.svg' alt='Mic' />
        </div>
        {isSectionsVisible && (
          <div className='section right'>
            <img
              src='/images/header-images/search.svg'
              className='toggle-search'
              alt='Search'
              onClick={toggleSections}
            />
            {userData ? (
              <div className='dropdown'>
                <img src='/images/header-images/add-video.svg' alt='Video' />
                <img src='/images/header-images/notification-alarm-bell_svgrepo.com.svg' alt='Bell' />
                <img
                  src={userData.profilePicture || '/images/header-images/acc.svg'}
                  className='sectionProfilePicture'
                  alt='Profile'
                  onClick={toggleDropdown}
                />
                <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`}>
                  <div className='dropdown-scroll'>
                    <div>
                      {renderItems(dropdownSections(userData), userData)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link to='/sign-in'>
                <button className='login-button'>
                  <p className='text'>Sign In</p>
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
      <div className='header-spacer'></div>
    </div>
  );
}
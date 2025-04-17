// src/components/SocialIcons.js
import React from 'react';
import iconFacebook from '../../Images/icon-facebook.svg';
import iconGoogle from '../../Images/icon-google.svg';
import iconTwitter from '../../Images/icon-twitter.svg';
import iconApple from '../../Images/icon-apple.svg';

import './SocialIcons.css'; // для стилей

const SocialIcons = () => {
  return (
    <div className="logoSection">
<a href=""><img src={iconFacebook} alt="Facebook" /></a>
<a href=""><img src={iconGoogle} alt="Google" /></a>
<a href=""><img src={iconTwitter} alt="Twitter" /></a>
<a href=""><img src={iconApple} alt="Apple" /></a>
    </div>
  );
};

export default SocialIcons;

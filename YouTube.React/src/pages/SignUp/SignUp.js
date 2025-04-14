import './SignUp.css';
import React from 'react';
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider';

export default function SignUp()
{
  const Photos = 
  [
    ["./images/sign-page/SignPhoto1.png", "./images/sign-page/SignPhoto2.png", "./images/sign-page/SignPhoto3.png"],
    ["./images/sign-page/SignPhoto4.png", "./images/sign-page/SignPhoto5.png", "./images/sign-page/SignPhoto6.png"],
    ["./images/sign-page/SignPhoto7.png", "./images/sign-page/SignPhoto1.png", "./images/sign-page/SignPhoto3.png"]
  ]

  return (
    <div className='page'>

      <div className='photos'>
        <PhotoSlider sources={Photos[0]}/>
        <PhotoSlider sources={Photos[1]}/>
        <PhotoSlider sources={Photos[2]}/>
      </div>

      <div className='block'>
        <div>
          <img src='./images/sign-page/icon_arrow_insert.svg'></img>
        </div>

        <div>
          <h1 className='mainText'>
            Create<br />
            an account
          </h1>
        </div>

        <label>
          <div className='inputSection'>
            <input className='input' type="text" placeholder="Name"/>
            <input className='input' type="text" placeholder="Email"/>
          </div>

          <div className='inputSection'>
            <input className='input' type="password" placeholder="Password"/>
            <input className='input' type="password" placeholder="Repeat password"/>
          </div>
        </label>

        <div className='bottomSection'>
          <div className='logoSection'>
            <a href=""><img src='./images/sign-page/icon-facebook.svg'/></a>
            <a href=""><img src='./images/sign-page/icon-google.svg'/></a>
            <a href=""><img src='./images/sign-page/icon-twitter.svg'/></a>
            <a href=""><img src='./images/sign-page/icon-apple.svg'/></a>
          </div>
          <button className='log-in-button'><p className='text'>Log In</p></button>
        </div>

        <div className='flex-center'>
          <a href="#" className='link'><p className='text'>Welcome to AMTLIS</p></a>
        </div>
        <br/>
      </div>

    </div>
  )
};
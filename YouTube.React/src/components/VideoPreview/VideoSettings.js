import React from "react";
import './VideoSettings.css';

const VideoSettings = ({
  showSettings
}) => {

  return (
    <div className="dropup-content" style={{ display: showSettings ? 'block' : 'none' }}>
      <div className='section'>
        <div className='dropup-item'>
          <p>Annotation</p>

          <label class="switch">
            <input type="checkbox"></input>
            <span class="slider round"></span>
          </label>
        </div>

        <div className='dropup-item'>
          <p>Playback speed</p>

          <div className="dropup-item-option">
            <p>Ordinary</p>
            <img className='arrow' src='./images/header-images/arrow_forward_ios.svg' alt='Arrow' />
          </div>
        </div>

        <div className='dropup-item'>
          <p>Quality</p>
          
          <div className="dropup-item-option">
            <p>Autotune (480p)</p>
            <img className='arrow' src='./images/header-images/arrow_forward_ios.svg' alt='Arrow' />
          </div>
        </div>

        <div className='dropup-item'>
          <p>Subtitles</p>
          
          <div className="dropup-item-option">
            <p>Off</p>
            <img className='arrow' src='./images/header-images/arrow_forward_ios.svg' alt='Arrow' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoSettings
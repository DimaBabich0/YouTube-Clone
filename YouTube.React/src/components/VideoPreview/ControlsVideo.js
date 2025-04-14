import React from "react";
import './VideoPreview.css';
import VideoSettings from "./VideoSettings";

const ControlsVideo = ({
  handlePlay, 
  handleVolume,
  handleProgressControls,
  handleFullScreen,
  handleMouseEnter,
  handleMouseLeave,
  handleMuted,
  handleShowSettings,
  showSettings,
  volume,
  muted,
  playedSeconds,
  loadedSeconds,
  showVolumeSlider,
  playing
}) => {
  let playedLenght = Math.floor(playedSeconds);
  let playedMin = Math.floor(playedLenght/60);
  let playedSec = Math.floor(playedLenght%60);

  let loadedLenght = Math.floor(loadedSeconds);
  let loadedMin = Math.floor(loadedLenght/60);
  let loadedSec = Math.floor(loadedLenght%60);

  const checkNumber = (num) => 
  {
    if(num < 10)
    {
      return "0" + num;
    }
    else return num;
  } 

  const getPercentage = () => {
    return (playedSeconds / loadedSeconds ) * 100;
  };

  return(
    <>
      <div 
        className="videoControlsPlay"
        onClick={handlePlay}
        onDoubleClick={handleFullScreen}
        >
        <img className="lock-select" style={{display: !playing ? 'block': 'none'}} src="./images/video-player/play_circle.svg"/>
      </div>

      <div className="videoControls">
        <div>
          <div className="range-background">
            <div 
              className="range-progress" 
              style={{ width: `${getPercentage()}%` }}
            ></div>
          </div>

          <input
            type="range" 
            className="videoControlsProgress"
            value={playedSeconds}
            min="0"
            max={loadedSeconds}
            step="1"
            onChange={(e) => handleProgressControls(e.target.value)}
          />

        </div>

        <div className="videoButtons">
          <div className="videoButtons-part">
            <img className="icon" src="./images/video-player/skip_previous.svg"/>

            <img onClick={handlePlay} className="icon" src={`./images/video-player/${playing ? 'pause_circle.svg' : 'play_arrow.svg'}`} />

            <img className="icon" src="./images/video-player/skip_next.svg"/>

            <div
              className="videoVolume"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >
                <div className="flex-center" onClick={handleMuted} >
                  <img className="icon" src="./images/video-player/primary-stroke.svg"/>
                  <img className="icon" src={`./images/video-player/${(muted || volume == 0) ? 'none-stroke.svg' : 'volume-stroke.svg'}`}/>
                </div>

              {showVolumeSlider ? (
                <input type="range"
                  value={muted ? 0 : volume}
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={handleVolume}
                />
              ) : ''}

            </div>

            <p className="player-lenght">{checkNumber(playedMin)}:{checkNumber(playedSec)}/{checkNumber(loadedMin)}:{checkNumber(loadedSec)}</p>
          </div>

          <div className="videoButtons-part">
            <div className="flex-center">
              <VideoSettings
                showSettings={showSettings}
              />
              <img onClick={handleShowSettings} className="icon" src="./images/video-player/setting.svg"/>
            </div>

            <img className="icon" src="./images/video-player/subtitles.svg"/>

            <img onClick={handleFullScreen} src="./images/video-player/fullscreen.svg"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ControlsVideo
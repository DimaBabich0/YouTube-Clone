import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player'
import './VideoPreview.css';
import ControlsVideo from './ControlsVideo';
import screenfull from 'screenfull';

const VideoPreview = ( {urlVideo} ) =>
{
  const [state, setState] = useState({
    playing: false,
    muted: false,
    showSettings: false,
    volume: 0.3,
    playedSeconds: 0,
    loadedSeconds: 1,
    playbackRate: 1,
    showVolumeSlider: 0
  })

  const {
    playing,
    muted,
    showSettings,
    volume,
    playedSeconds,
    loadedSeconds,
    playbackRate,
    showVolumeSlider
  } = state

  const refPlayer = useRef()
  const refPlayerContainer = useRef()

  const handlePlay = () => {
    setState({...state, playing: !state.playing})
  }

  const handleVolume = (e) => {
    setState({...state, volume: e.target.value})
    if(muted)
      handleMuted();
  }

  const handleMuted = () => {
    setState({...state, muted: !state.muted})
  }

  const handleShowSettings = () => {
    setState({...state, showSettings: !state.showSettings})
  }

  const handlePlaybackRate = (e) => {
    setState({...state, playbackRate: e.target.value})
  }

  const handleFullScreen = () => {
    screenfull.toggle(refPlayerContainer.current)
  }

  const setDuration = (e) => {
    setState({...state, loadedSeconds: e})
  }
  const getLenghtVideo = () => {
    setDuration(refPlayer.current.getDuration())
  }

  const handleProgress = (e) => {
    setState({...state, playedSeconds: e.playedSeconds})
  }

  const handleProgressControls = (e) => {
    refPlayer.current.seekTo(Number(e))
  }

  const handleMouseEnter = () => {
    setState({...state, showVolumeSlider: true})
  };

  const handleMouseLeave = () => {
    setState({...state, showVolumeSlider: false})
  };

  return (
    <div className='videoPlayer' ref={refPlayerContainer}>
      <ReactPlayer
        className="lock-select"
        url={urlVideo}
        controls={false}
        playing={playing}
        muted={muted}
        width="100%"
        height="100%"
        volume={volume}
        ref={refPlayer}
        progressInterval={100}
        onProgress={handleProgress}
        playbackRate={playbackRate}
        onEnded={handlePlay}
        onReady={ getLenghtVideo }
        
        config={{
          youtube: {
            playerVars: { 
              autoplay: 0,
              showinfo: 0,
              controls: 0,
              disablekb: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              rel: 0
            }
          }
        }}
      />
      <ControlsVideo 
        handlePlay={handlePlay}
        handleVolume={handleVolume}
        handleProgressControls={handleProgressControls}
        handleFullScreen={handleFullScreen}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleMuted={handleMuted}
        handleShowSettings={handleShowSettings}

        volume={volume}
        muted={muted}
        showSettings={showSettings}
        playing={playing}
        playedSeconds={playedSeconds}
        loadedSeconds={loadedSeconds}
        showVolumeSlider={showVolumeSlider}
      />
    </div>
  )
}

export default VideoPreview
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const chipNames = [
  'All', 'Music', 'Jams', 'Podcasts', 'Comedy', 'Live', 'Selena Gomez', 'Manga', 'Game Shows', 'Spiderman', 'Existential Dread', 'Horrors Beyond Comprehension'
];

const renderVideos = (videos) => {
  return videos.map((video) => (
    <Link to={`/video/${video.id}`} key={video.id}>
      <div className='item-wrapper'>
        <img className='thumbnail' src={video.thumbnailPath} alt="Video thumbnail" />
        <div className='info-section'>
          <Link to={`/channel/${video.channelId}`}>
            <img className='profile-picture' src={video.profilePicturePath} alt="Channel profile" />
          </Link>
          <div className='text-section'>
            <h1 className='video-name'>{video.title}</h1>
            <Link to={`/channel/${video.channelId}`}>
              <p className='channel-name'>{video.channelName}</p>
            </Link>
            <div className='row'>
              <p className='video-info'>{video.viewCount} views</p>
              <p className='video-info'>{video.uploadDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));
};

export default function MainPage() {
  const [activeButton, setActiveButton] = useState(0);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5103/videos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке видео');
        }
        return response.json();
      })
      .then(data => {
        data.forEach(video => {
          video.profilePicturePath = "http://localhost:5103" + video.profilePicturePath;
          video.thumbnailPath = "http://localhost:5103" + video.thumbnailPath;
        });
        setVideoData(data);
      })
      .catch(error => {
        console.error('Ошибка при получении видео:', error);
      });
  }, []);

  return (
    <div className="main">
      <div className='main--container'>
        <div className='banner'>
          <div className='banner-contents'>
            <div className='banner-text-container'>
              <h1 className='banner-text'>ВЕДИ МЕНЕ В ХРАМ</h1>
              <h1 className='grey-text banner-text'>(TAKE ME TO CHURCH УКРАЇНСЬКОЮ)</h1>
            </div>
            <div className='banner-items'>
              <div className='banner-wrapper'>
                <div className='row'>
                  <div className='row'>
                    <button className='button-watch'>Watch</button>
                    <h2 className='banner-text'>Enleo • 5m views • 6 day ago</h2>
                  </div>
                  <div className='carousel row right'>
                    <img src='/images/icons/arrow_back_ios.svg' />
                    <div className='carousel-item'>
                      <img className='carousel-img' src='./images/carousel/img1.png' />
                    </div>
                    <div className='carousel-item'>
                      <img className='carousel-img' src='./images/carousel/img2.png' />
                    </div>
                    <div className='carousel-item'>
                      <img className='carousel-img' src='./images/banner.jpg' />
                    </div>
                    <img src='/images/icons/arrow_back_ios_r.svg' />
                  </div>
                </div>
                <div className='progress-bar'>
                  <div className='time' />
                </div>
                <p className='time-text'>3:55</p>
              </div>
            </div>
          </div>
          <div className='banner-gradient-side'></div>
          <div className='banner-gradient-bottom'></div>
        </div>
      </div>
      <div className='horizontal-scroller'>
        <div className='gradient right'></div>
        <div className='gradient left'></div>
        <div className='chip-bar'>
          <div className='inner-box'>
            <div className='item-box'>
              {chipNames.map((chip, index) => (
                <button
                  key={index}
                  className={`item ${activeButton === index ? 'active' : ''}`}
                  onClick={() => setActiveButton(index)}
                >
                  <p>{chip}</p>
                </button>
              ))}
            </div>
            <div className='vertical-mid-hack'></div>
          </div>
        </div>
      </div>

      <div className='grid-container'>

        <div className='section-grid wrapper'>
          <h1 className='section-name'>Top 10 on this week</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div>

        {/* 
        <div className='section-grid wrapper'>
          <h1 className='section-name'>Continue Watching</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div>
        */}

      </div>
    </div>
  );
}

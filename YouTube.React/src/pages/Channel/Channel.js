import './Channel.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const chipNames = [
  'Home',
  'Videos',
  'Subscriptions',
  'Playlists',
  'Community',
  'About'
];

const renderVideos = (videos) => {
  return videos.map((video, index) => (
    <Link to='/video'>

      <div className='item-wrapper' key={index}>
        <img className='thumbnail' src={video.src} alt="Video thumbnail" />
        <div className='info-section'>
          <img className='profile-picture' src={video.src} />
          <div className='text-section'>
            <h1 className='video-name'>{video.name}</h1>
            <p className='channel-name'>{video.channel}</p>
            <div className='row'>
              <p className='video-info'>{video.views}</p>
              <p className='video-info'>{video.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));
};

export default function Channel() {
  const [activeButton, setActiveButton] = useState(0);

  const { id } = useParams();
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5103/Users/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        data.profilePicture = 'http://localhost:5103' + data.profilePicture;
        console.log(data);
        setChannelData(data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных пользователя:', error);
        setChannelData(null);
      });
  }, [id]);

  return (
    <div className='channel'>
      <div className='channel-banner'>
        <div className='banner-'></div>
        <div className='banner-profile-section '>
          <img className='profile-picture' src='./images/header-images/acc.svg'></img>
          <div>
            <h1 className='my-channel-name'>LiLia Hmel</h1>
            <div className='row-section'>
              <p className='user-name'>@kltrons</p>
              <p className='subscribers'>300 subscribers</p>
            </div>
            <div className='button-row'>
              <div>
                <button className='btn-control'>Video Control</button>

              </div>
              <div className='row'>
                <img className='icon' src='/images/icons/bar_chart.svg' />
                <img className='icon' src='/images/icons/heart.svg' />
              </div>

            </div>
          </div>
        </div>
        <img className='banner-image' src='./images/banner1.png'></img>
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
                  className={`item-no-border ${activeButton === index ? 'current-category' : ''}`}
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
        {/* <div className='section-grid wrapper'>
          <h1 className='section-name'>All Videos</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div> */}

        {/* <div className='section-grid wrapper'>
          <h1 className='section-name'>Mixes</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div> */}
      </div>
    </div>
  )
}
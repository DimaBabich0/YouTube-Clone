import './Channel.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const chipNames = [
  'Home',
  'Videos',
  'Subscriptions',
  'Playlists',
  'Community',
  'About'
];

const renderSections = (array) => {
  {
    return Array.isArray(array) && array.length > 0 ? (
      <div className='section-grid wrapper'>
        <h1 className='section-name'>All Videos</h1>
        <section className='video-grid'>
          {renderVideos(array)}
        </section>
      </div>
    ) : (
      <h1>У канала пока нет видео.</h1>
    )
  }
};

const renderVideos = (videos) => {
  return videos.map((video) => (
    <Link to={`/video/${video.id}`} key={video.id}>
      <div className='item-wrapper'>
        <img className='thumbnail' src={video.thumbnailPath} alt="Video thumbnail" />
        <div className='info-section'>
          <img className='profile-picture' src={video.profilePicturePath} alt="Channel profile" />
          <div className='text-section'>
            <h1 className='video-name'>{video.title}</h1>
            <p className='channel-name'>{video.channelName}</p>
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

export default function Channel() {
  const [activeButton, setActiveButton] = useState(0);

  const { id } = useParams();
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5103/Channels/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        data.picturePath = 'http://localhost:5103' + data.picturePath;
        data.bannerPath = 'http://localhost:5103' + data.bannerPath;

        data.videos.forEach(video => {
          video.thumbnailPath = 'http://localhost:5103' + video.thumbnailPath;
          video.profilePicturePath = 'http://localhost:5103' + video.profilePicturePath;
        });

        setChannelData(data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных пользователя:', error);
        setChannelData(null);
      });
  }, [id]);

  if (!channelData) return null;

  return (
    <div className='channel'>
      <div className='channel-banner'>
        <div className='banner-profile-section '>
          <img className='banner-profile-picture' src={channelData.picturePath} alt='avatar'></img>

          <div>
            <h1 className='my-channel-name'>{channelData.name}</h1>

            <div className='row-section'>
              <p className='user-name'>@{channelData.id}</p>
              <p className='subscribers'>{channelData.subscriberCount} subscribers</p>
            </div>

            {channelData.id === Cookies.get('username') ? (
              <div className='btn-row'>
                <Link className='row' to="/VideoControl">
                  <button className='btn-control'>Video Control</button>
                </Link>
                <Link className='row' to="/VideoControl">
                  <img className='icon' src='/images/icons/bar_chart.svg' alt='statistics' />
                </Link>
                <Link className='row' to={`/channel/${channelData.id}/settings`}>
                  <img className='icon' src='/images/icons/pen.svg' alt='settings' />
                </Link>
              </div>
            ) : (
              <div className='btn-row'>
                <div className='row'>
                  <button className='btn-subscribe'>Subscribe</button>
                </div>
                <div className='row'>
                  <img className='icon' src='/images/icons/notification-bell.svg' alt='settings' />
                </div>
              </div>
            )}

          </div>
        </div>
        <img className='banner-image' src={channelData.bannerPath} alt='banner'></img>
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
        {renderSections(channelData.videos)}
      </div>
    </div>
  )
}
import './Channel.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const videoData = [
    {
      src: "./images/previews/t1.png",
      name: "C4D 2023 Tutorial: Abstract Flowers with Hair, Dynamics and Redshift",
      channel: "SKVOT",
      views: "12K views",
      date: "1 year ago",
    },
    {
      src: "./images/previews/t2.png",
      name: "Five Nights At Freddy's | Official Teaser",
      channel: "Universal Pictures",
      views: "12K views",
      date: "1 year ago",
    },
    {
      src: "./images/previews/t3.png",
      name: "Rush E",
      channel: "St3inway",
      views: "12K views",
      date: "1 year ago",
    },
    {
      src: "./images/previews/t4.png",
      name: "'Before Your Very Eyes...Atoms for Peace -MAMA JAMMA (Live cover)",
      channel: "St3inway",
      views: "12K views",
      date: "1 year ago",
    }
  ];

const chipNames = [
    'Home',
    'Videos',
    'Playme',
    'Subscriptions',
    'Playlists',
    'Community',
    'About']; 

  const renderVideos = (videos) => {
    return videos.map((video, index) => (
      <Link to='/video'>
        
      <div className='item-wrapper' key={index}>
        <img className='thumbnail' src={video.src} alt="Video thumbnail" />
        <div className='info-section'>
          <img className='profile-picture' src={video.src}/>
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

export default function Channel()
{
  const [activeButton, setActiveButton] = useState(0);

    return(
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
                              <img className='icon' src='/images/icons/bar_chart.svg'/>
                              <img className='icon'  src='/images/icons/heart.svg'/>
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
        <div className='section-grid wrapper'>
          <h1 className='section-name'>Popular</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div>
        <div className='section-grid wrapper'>
          <h1 className='section-name'>All Videos</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div>
        <div className='section-grid wrapper'>
          <h1 className='section-name'>Mixes</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div>
      </div>
        </div>
    )
}
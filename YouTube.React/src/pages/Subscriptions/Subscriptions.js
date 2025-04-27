import './Subscriptions.css';
import React from 'react';
import { Link } from 'react-router-dom';

const videoData = [
    {
      src: "./images/previews/t1.png",
      name: "@name",
      channel: "SKVOT",
      views: "12,9k subscribers",
      date: "1 year ago",
    }
  ];
  
  const renderVideos = (videos) => {
    return videos.map((video, index) => (
      <div className='item-wrapper' key={index}>
        <div className='picture-wrapper'>
            <img className='picture' src={video.src}></img>
        </div>
        <div className='text-section sub'>
            <p className='sub-channel-name'>{video.channel}</p>
            <p className='user-name'>{video.name}</p>
            <p className='subscribers'>{video.views}</p>
        </div>
      </div>
    ));
  };
  
  
export default function Subscriptions()
{
    return(
        <div className='subscriptions'> 
            <div className='grid-container'>
                <div className='section-grid wrapper'>
                  <h1 className='section-name'>Channels</h1>
                  <section className='subscriptions-grid'>
                      {renderVideos(videoData)}
                  </section>
              </div>
            </div>
        </div>
    )
}
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
    },
    {
      src: "./images/previews/t2.png",
      name: "@name",
      channel: "Universal Pictures",
      views: "12,9k subscribers",
      date: "1 year ago",
    },
    {
      src: "./images/previews/t3.png",
      name: "@name",
      channel: "St3inway",
      views: "12,9k subscribers",
      date: "1 year ago",
    },
    {
      src: "./images/previews/t4.png",
      name: "@name",
      channel: "St3inway",
      views: "12,9k subscribers",
      date: "1 year ago",
    },
    {
      src: "./images/previews/t4.png",
      name: "@name",
      channel: "St3inway",
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
                <h1 className='section-name'>Top 10 on this week</h1>
                <section className='subscriptions-grid'>
                    {renderVideos(videoData)}
                </section>
                </div>
                <div className='section-grid wrapper'>
                <h1 className='section-name'>Continue Watching</h1>
                <section className='subscriptions-grid'>
                    {renderVideos(videoData)}
                </section>
                </div>
                <div className='section-grid wrapper'>
                <h1 className='section-name'>Popular</h1>
                <section className='subscriptions-grid'>
                    {renderVideos(videoData)}
                </section>
                </div>
                <div className='section-grid wrapper'>
                <h1 className='section-name'>All Video</h1>
                <section className='subscriptions-grid'>
                    {renderVideos(videoData)}
                </section>
            </div>
            </div>
        </div>
    )
}
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPreview from '../../components/VideoPreview/VideoPreview';
import './Video.css';
import CommentList from '../../components/Comment/CommentList';


const videos = [
  {
    id: 1,
    title: "ENLEO - ВЕДИ МЕНЕ В ХРАМ (TAKE ME TO CHURCH УКРАЇНСЬКОЮ)",
    embedUrl: "https://www.youtube.com/embed/icaSda6Rrrg",
    videoId: "icaSda6Rrrg",
    views: "3.9м views",
    date: "1 year ago",
    img: "https://i.ytimg.com/vi/icaSda6Rrrg/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC3WOPj2-cvJu-7TXx5m_fus8zMYA"
  },
  {
    id: 2,
    title: "ENLEO - чорнеморе",
    embedUrl: "https://www.youtube.com/embed/usjKehP1928",
    videoId: "usjKehP1928",
    views: "1.5м views",
    date: "2 years ago",
    img: "https://i.ytimg.com/vi/usjKehP1928/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCH4DeIeuN0-PcgW0rwLprVSTC1NA"
  },
  {
    id: 3,
    title: "ENLEO - вальс під вибухи",
    embedUrl: "https://www.youtube.com/embed/X0oTXl_8Xb8",
    videoId: "X0oTXl_8Xb8",
    views: "1.5м views",
    date: "2 years ago",
    img: "https://i.ytimg.com/vi/X0oTXl_8Xb8/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDnnvk0tAmKIvV3UrmcEPV3OW1Akg"
  },
  {
    id: 4,
    title: "ENLEO - м'ятна ніч",
    embedUrl: "https://www.youtube.com/embed/TEk5imMIOQI",
    videoId: "TEk5imMIOQI",
    views: "1.5м views",
    date: "2 years ago",
    img: "https://i.ytimg.com/vi/TEk5imMIOQI/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDc0Ghtide2y-1ZGPRZzhLJxy6HCw"
  },
  // Add more videos as needed
];

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



const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [video, setVideo] = useState(videos.find(v => v.id === parseInt(id)) || videos[0]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
  
    // script.onload = () => {
    //   window.YT.ready(() => {
    //     const player = new window.YT.Player(`player-${video.id}`, {
    //       videoId: video.videoId,
    //       events: {
    //         'onReady': onPlayerReady,
    //         'onStateChange': onPlayerStateChange
    //       }
    //     });
  
    //     // Обновляем playerRef.current только после полной инициализации плеера
    //     playerRef.current = player;
    //   });
    // };
  
    return () => {
      // Очищаем плеер при размонтировании компонента
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [video.id]);
  
  // useEffect(() => {
  //   // Проверяем, что playerRef.current и loadVideoById доступны перед вызовом
  //   if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
  //     playerRef.current.loadVideoById(video.videoId);
  //   }
  // }, [video]);
  // const onPlayerReady = (event) => {
  //   event.target.playVideo();
  // };

 


  const handleRecommendationClick = (id) => {
    const selectedVideo = videos.find(video => video.id === id);
    if (selectedVideo) {
      setVideo(selectedVideo);
      navigate(`/video/${id}`);
    } else {
      console.error(`Video with id ${id} not found`);
    }
  };
  

  if (!video) {
    return <div>Video not found</div>;
  }

  const recommendedVideos = videos.filter(vid => vid.id !== video.id);


  const renderVideos = (videos) => {
    return videos.map((video, index) => (
      
        
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
    
    ));
  };
  
  return (
    
    <div className="video-page">
      <main className="main-content">
        <div className="video-container">

          <VideoPreview urlVideo={'https://www.youtube.com/embed/icaSda6Rrrg'} />
        </div>
        <div className="video-title">
          <h1>{video.title}</h1>
        </div>
        
        <div className="author-section">
          <div className="author-img">
            <img src="https://yt3.googleusercontent.com/QkhyUlKkHsRSfNLVb0lup5QtJ3O5f9yv8R8HbBa7ZLYU-rTuEMgb2RyByvdq7-je65WAiYav=s176-c-k-c0x00ffffff-no-rj" alt="ENLEO" />
            <div>
              <div className="author-name">ENLEO</div>
              <div>34,9k subscribers</div>
            </div>
          </div>
          <span className='Subscribe' onClick={() => console.log('Subscribe clicked')}>
            Subscribe
          </span>
          <div className="actions">
            <span className="action-item"onClick={() => console.log('Likes clicked')}>
            <img src="/images/icons/heart.svg" alt="Favorite" />

            <p>15 884 likes</p>
              </span>
              <span className="action-item" onClick={() => console.log('Forward clicked')}>
              <img src="/images/header-images/forward.svg" alt="Forward" />
                <p>Forward</p>
              </span>
              <span className="action-item" onClick={() => console.log('Add to playlist clicked')}>
              <img className='add-transform' src="/images/icons/add.svg" alt="Add" />
                <p>Add to playlist</p>
              </span>
              <span className="action-item" onClick={() => console.log('More clicked')}>
              <img src="/images/icons/arrow_back_ios_new.svg" alt="More" />
                <p>More</p>
              </span>
            </div>
            </div>
            <div className="description">
              <p>
                69k views 4 months ago<br /><br />
                Веди мене в храм є українськомовним перекладом відомої пісні Hozier «Take Me To Church»<br />
                від музиканта та співака з українського Маріуполя ENLEO Нікіти Леонтьєва.
              </p>
              <div className="additional-info">
                Show more
                <img src="/images/icons/arrow_back_ios_new.svg" alt="More" />
              </div>
            </div>


            <div className='section-grid wrapper'>
          <h1 className='section-name'>Recommended</h1>
          <section className='video-grid'>
            {renderVideos(videoData)}
          </section>
        </div>



            <div className="comment-wrapper">
      <p className="comment-profile">Comment</p>
      <div className="comment-container">
        <img
          className="profile-pic"
          src="/images/header-images/acc.svg"
          alt="Profile"
        />
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment"
        />
        <div className="icons">
          <span className="icon-smile"><img src="/images/icons/emoji.svg" alt="More" /></span>
          <span className="icon-at"><img src="/images/icons/Vector.svg" alt="More" /></span>
          <span className="icon-send"><img src="/images/icons/Frame.svg" alt="More" /></span>
        </div>
      </div>
    </div>




        <CommentList />
      </main>

      <aside className="recommended-videos">
        <h2>Videos from this chanel</h2>
        <ul>
          {recommendedVideos.map(video => (
            <li key={video.id} className="recommended-video" onClick={() => handleRecommendationClick(video.id)}>
              <img src={video.img} alt={video.title} />
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.views}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      </div>
  );
}


export default VideoPage;

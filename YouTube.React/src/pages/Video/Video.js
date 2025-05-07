import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Video.css';
import VideoPreview from '../../components/VideoPreview/VideoPreview';
import TimeFormatter from '../../components/Common/TimeFormatter';
import ChannelVideos from './Component/ChannelVideos';
import RecommendedVideo from './Component/RecommendedVideo';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных видео и рекомендованных видео
  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);

      try {
        const videoResponse = await fetch(`http://localhost:5103/Videos/${id}`);
        if (!videoResponse.ok) throw new Error('Видео не найдено'); 

        var videoData = await videoResponse.json();

        videoData.profilePicturePath = 'http://localhost:5103' + videoData.profilePicturePath;

        setVideo(videoData);
        
        console.log(videoData);

        const recommendationsResponse = await fetch(`http://localhost:5103/Videos/Recommended/${id}`);
        if (recommendationsResponse.ok) {
          const recommendedData = await recommendationsResponse.json();
          setRecommendedVideos(recommendedData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;

  if (!video || !video.filePath) return <div>Видео не найдено</div>;


  // const handleRecommendationClick = (id) => {
  //   const selectedVideo = videos.find(video => video.id === id);
  //   if (selectedVideo) {
  //     setVideo(selectedVideo);
  //     navigate(`/video/${id}`);
  //   } else {
  //     console.error(`Video with id ${id} not found`);
  //   }
  // };


  if (!video) {
    return <div>Video not found</div>;
  }

  const renderVideos = (videos) => {
    return videos.map((video, index) => (


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

    ));
  };

  return (

    <div className="video-page">
      <main className="main-content">
        <div className="video-container">
          <VideoPreview urlVideo={video.filePath} />
        </div>
        <div className="video-title">
          <h1>{video.title}</h1>
        </div>

        <div className="author-section">
          <div className="author-img">
            <img src={video.profilePicturePath} alt="ENLEO" />
            <div>
              <div className="author-name">{video.channelName}</div>
              {/* <div>{vidoe.}</div> Здесь должно быть количество подписчиков*/}
            </div>
          </div>
          <span className='Subscribe' onClick={() => console.log('Subscribe clicked')}>
            Subscribe
          </span>
          <div className="actions">
            <span className="action-item" onClick={() => console.log('Likes clicked')}>
              <img src="/images/icons/heart.svg" alt="Favorite" />
              {video.likesCount} 
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
          {video.viewCount} views • <TimeFormatter date={video.uploadDate}/> <br /><br />
            {video.description}
          </p>
          <div className="additional-info">
            Show more
            <img src="/images/icons/arrow_back_ios_new.svg" alt="More" />
          </div>
        </div>


        <div className='section-grid wrapper'>
          <h1 className='section-name'>Recommended</h1>
          <section className='video-grid'>
          <RecommendedVideo channelName={video.channelName} currentVideoId={video.id} />
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




        {/* <CommentList /> */}
      </main>

      <aside className="channel-videos">
        <p>Videos from this chanel</p>
        <ul>
        <ChannelVideos channelName={video.channelName} currentVideoId={video.id} />
          {/* {recommendedVideos.map(video => (
            <li key={video.id} className="recommended-video" onClick={() => handleRecommendationClick(video.id)}>
              <img src={video.img} alt={video.title} />
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.views}</p>
              </div>
            </li>
          ))} */}
        </ul>
      </aside>
    </div>
  );
}


export default VideoPage;

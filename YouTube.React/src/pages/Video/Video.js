import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPreview from '../../components/VideoPreview/VideoPreview';
import './Video.css';
import CommentList from '../../components/Comment/CommentList';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Конвертирует обычную ссылку YouTube в embed-ссылку
  const convertToEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:5103/video/${id}`);
        if (!response.ok) {
          throw new Error('Video not found');
        }
        const videoData = await response.json();
        setVideo(videoData);
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchVideoData();
  }, [id]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        const response = await fetch('http://localhost:5103/video');
        const recommended = await response.json();
        setRecommendedVideos(recommended);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    fetchRecommendedVideos();
  }, []);

  const handleRecommendationClick = (id) => {
    navigate(`/video/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video || !video.FilePath) {
    return (
      <div>
        <h2>Видео не найдено на сервере, но вы можете попробовать открыть его на YouTube:</h2>
        {video && video.FilePath && (
          <iframe
            width="100%"
            height="480"
            src={convertToEmbedUrl(video.FilePath)} // Используем нашу функцию для конвертации в embed-ссылку
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
        <p>
          Или откройте напрямую:{" "}
          <a
            href={video ? video.FilePath : '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {video ? video.FilePath : 'Ссылка недоступна'}
          </a>
        </p>
      </div>
    );
  }
  
  return (
    <div className="video-page">
      <main className="main-content">
        <div className="video-container">
          <VideoPreview src={`${video.FilePath}`} />
        </div>
        <div className="video-title">
          <h1>{video.Title}</h1>
        </div>

        <div className="author-section">
          <div className="author-img">
            <img src={video.ProfilePicturePath} alt={video.ChannelName} />
            <div>
              <div className="author-name">{video.ChannelName}</div>
              <div>34,9k subscribers</div>
            </div>
          </div>
          <span className='Subscribe' onClick={() => console.log('Subscribe clicked')}>
            Subscribe
          </span>
        </div>

        <div className="description">
          <p>{video.Description}</p>
          <div className="additional-info">
            Show more
            <img src="/images/icons/arrow_back_ios_new.svg" alt="More" />
          </div>
        </div>

        <div className="section-grid wrapper">
          <h1 className='section-name'>Recommended</h1>
          <section className='video-grid'>
            {recommendedVideos.map((video) => (
              <div className="item-wrapper" key={video.id} onClick={() => handleRecommendationClick(video.id)}>
                <img className='thumbnail' src={video.ThumbnailPath} alt="Video thumbnail" />
                <div className='info-section'>
                  <img className='profile-picture' src={video.ProfilePicturePath} alt="" />
                  <div className='text-section'>
                    <h1 className='video-name'>{video.Title}</h1>
                    <p className='channel-name'>{video.ChannelName}</p>
                    <div className='row'>
                      <p className='video-info'>{video.ViewCount} views</p>
                      <p className='video-info'>{video.UploadDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="comment-wrapper">
          <p className="comment-profile">Comment</p>
          <div className="comment-container">
            <img className="profile-pic" src="/images/header-images/acc.svg" alt="Profile" />
            <input type="text" className="comment-input" placeholder="Add a comment" />
            <div className="icons">
              <span className="icon-smile"><img src="/images/icons/emoji.svg" alt="More" /></span>
              <span className="icon-at"><img src="/images/icons/Vector.svg" alt="More" /></span>
              <span className="icon-send"><img src="/images/icons/Frame.svg" alt="More" /></span>
            </div>
          </div>
        </div>

        <CommentList />
      </main>
    </div>
  );
};

export default VideoPage;
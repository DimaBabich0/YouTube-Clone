import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RecommendedVideo.css';
import TimeAgo from './TimeAgo';

const RecommendedVideos = ({ currentVideoId, genre }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5103/Videos');
        if (!response.ok) throw new Error('Ошибка при получении видео');

        const data = await response.json();

        data.forEach(video => {
          video.profilePicturePath = "http://localhost:5103" + video.profilePicturePath;
          video.thumbnailPath = "http://localhost:5103" + video.thumbnailPath;
        });

        const filteredVideos = data.filter(
          video => 
            (video.genre === genre || genre === '') && 
            video.id !== currentVideoId
        );

        setVideos(filteredVideos.slice(0, 4)); 
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentVideoId) {
      fetchRecommendedVideos();
    }
  }, [currentVideoId, genre]);

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
                <p className='video-info'><TimeAgo date={video.uploadDate}/></p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {videos.length === 0 ? (
        <div>Нет видео для отображения</div>
      ) : (
        <div className='videos-container'>
          {renderVideos(videos)}
        </div>
      )}
    </div>
  );
};

export default RecommendedVideos;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChannelVideos = ({ channelName }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   
  }, [channelName]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ul>
      {videos.length === 0 ? (
        <div>Нет видео для отображения</div>
      ) : (
        videos.map((video) => (
          <li key={video.id} onClick={() => navigate(`/video/${video.id}`)}>
            <img src={video.thumbnailPath} alt={video.title} />
            <div>
              <h3>{video.title}</h3>
              <p>{video.viewCount} views</p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ChannelVideos;

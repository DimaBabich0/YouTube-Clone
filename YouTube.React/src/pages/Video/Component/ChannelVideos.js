import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChannelVideos = ({ channelName, currentVideoId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllVideos = async () => {
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
          video => video.channelName === channelName && video.id !== currentVideoId
        );
        setVideos(filteredVideos.slice(0, 4));
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (channelName && currentVideoId) {
      fetchAllVideos();
    }
  }, [channelName, currentVideoId]);

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
              <p>{video.channelName}</p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ChannelVideos;

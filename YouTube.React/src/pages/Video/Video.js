import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Video.css';
import VideoPreview from '../../components/VideoPreview/VideoPreview';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Функция для преобразования URL в embed ссылку
  const convertToEmbedUrl = (url) => {
    try {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Добавлен параметр autoplay
    } catch (error) {
      console.error('Ошибка преобразования URL:', error);
      return null;
    }
  };

  // Загрузка данных видео и рекомендованных видео
  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);

      try {
        const videoResponse = await fetch(`http://localhost:5103/Videos/${id}`);
        if (!videoResponse.ok) throw new Error('Видео не найдено');

        const videoData = await videoResponse.json();
        setVideo(videoData);

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

  return (
    <div className="video-page">
      <div className="main-content">
        <div className="video-container">
          <div className="video-player-wrapper">
            <VideoPreview urlVideo={convertToEmbedUrl(video.filePath)} /> {/* Передаем URL с параметром autoplay */}
          </div>
        </div>

        <div className="video-info">
          <h1>{video.title}</h1>
          <p>{video.description}</p>
          <p>Канал: {video.channelName}</p>
          <p>Просмотры: {video.viewCount}</p>
        </div>

        <div className="recommendations">
          <h2>Рекомендованные</h2>
          <div className="video-grid">
            {recommendedVideos.map((rec) => (
              <div key={rec.id} className="recommended-video" onClick={() => navigate(`/video/${rec.id}`)}>
                <img src={rec.thumbnailPath} alt="thumbnail" />
                <p>{rec.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;

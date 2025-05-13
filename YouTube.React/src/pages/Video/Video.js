import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Video.css';
import VideoPreview from '../../components/VideoPreview/VideoPreview';
import TimeFormatter from '../../components/Common/TimeFormatter';
import ChannelVideos from './Component/ChannelVideos';
import RecommendedVideo from './Component/RecommendedVideo';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Получаем данные о видео
        const videoResponse = await fetch(`http://localhost:5103/Videos/${id}`);
        if (!videoResponse.ok) throw new Error('Видео не найдено');
        const videoData = await videoResponse.json();

        // Дополняем данные о видео
        videoData.profilePicturePath = 'http://localhost:5103' + videoData.profilePicturePath;
        setVideo(videoData);

        // Получаем данные о канале
        const channelResponse = await fetch(`http://localhost:5103/Channels/${videoData.channelName}`);
        if (channelResponse.ok) {
          const channelData = await channelResponse.json();
          channelData.picturePath = 'http://localhost:5103' + channelData.picturePath;
          setChannel(channelData);
        } else {
          console.error('Ошибка при получении данных о канале');
        }

      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!video) return <div>Видео не найдено</div>;

  return (
    <div className="video-page">
      <main className="main-content">
        <div className="video-and-channel">
          <div className="video-container">
            <VideoPreview urlVideo={video.filePath} />
          </div>
          <aside className="channel-videos">
            <p>Videos from this channel</p>
            <ul>
              <ChannelVideos channelName={video.channelName} currentVideoId={video.id} />
            </ul>
          </aside>
        </div>

        <div className="author-section">
          <div className="author-img">
            {channel && <img src={channel.picturePath} alt={channel.name} />}
            <div>
              <div className="author-name">{video.channelName}</div>
              <div className="author-subscriberCount">{channel ? `${channel.subscriberCount} подписчиков` : 'Подписчики не указаны'}</div>
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
            {video.viewCount} views • <TimeFormatter date={video.uploadDate} /> <br /><br />
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
            <img className="profile-pic" src="/images/header-images/acc.svg" alt="Profile" />
            <input type="text" className="comment-input" placeholder="Add a comment" />
            <div className="icons">
              <span className="icon-smile"><img src="/images/icons/emoji.svg" alt="More" /></span>
              <span className="icon-at"><img src="/images/icons/Vector.svg" alt="More" /></span>
              <span className="icon-send"><img src="/images/icons/Frame.svg" alt="More" /></span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VideoPage;

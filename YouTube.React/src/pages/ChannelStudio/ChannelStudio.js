import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ChannelStudio.css';

const API = 'http://localhost:5103';

function formatDateNumeric(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const ChannelStudio = () => {
  const { id } = useParams();
  const username = Cookies.get("username");

  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editVideoId, setEditVideoId] = useState(null);
  const [newVideo, setNewVideo] = useState({
    id: '',
    title: '',
    filePath: '',
    thumbnail: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5103/Videos/Channel/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setVideos(data);
        })
        .catch(error => {
          console.error('Ошибка при получении данных пользователя:', error);
        });
      setLoading(false);
    }
  }, [id]);

  if (!username || username !== id) {
    return <div className="not-owner-warning">Вы не владелец этого канала.</div>;
  }

  const resetForm = () => {
    setNewVideo({ title: '', filePath: '', thumbnail: '' });
    setIsModalOpen(false);
    setIsEditing(false);
    setEditVideoId(null);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("channelId", id);

    try {
      const res = await fetch(`${API}/Videos/UploadThumbnail`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setNewVideo(prev => ({ ...prev, thumbnail: data.path }));
    } catch (error) {
      console.error("Ошибка загрузки превью:", error);
    }
  };

  const handleSaveVideo = async () => {
    if (!newVideo.title || !newVideo.filePath || !newVideo.thumbnail) {
      alert("Заполните все поля и загрузите превью.");
      return;
    }

    const method = isEditing ? 'PUT' : 'POST';
    const endpoint = isEditing ? `${API}/Videos/Update` : `${API}/Videos/Create`;

    let payload;
    if (!isEditing) {
      payload = {
        Title: newVideo.title,
        FilePath: newVideo.filePath,
        ThumbnailPath: newVideo.thumbnail,
        Description: newVideo.description,
        ChannelId: id,
      };
    } else {
      payload = {
        Id: newVideo.id,
        Title: newVideo.title,
        FilePath: newVideo.filePath,
        Description: newVideo.description,
        ThumbnailPath: newVideo.thumbnail,
      }
    }

    console.log(method);
    console.log(endpoint);
    console.log(payload);

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Ошибка: ${errorData.message || 'Не удалось сохранить видео'}`);
        return;
      }

      const updated = await res.json();
      if (isEditing) {
        setVideos(prev => prev.map(v => v.id === editVideoId ? updated : v));
      } else {
        setVideos(prev => [...prev, updated]);
      }

      resetForm();
    } catch (err) {
      console.error("Ошибка сохранения видео:", err);
    }
  };

  const handleEdit = (video) => {
    console.log(video);
    setNewVideo({
      id: video.id,
      title: video.title,
      filePath: video.filePath,
      thumbnail: video.thumbnailPath,
      description: video.description || '',
      channelName: video.channelName,
      uploadDate: video.uploadDate,
      viewCount: video.viewCount,
      duration: video.duration,
      channelId: id
    });
    setEditVideoId(video.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Вы уверены, что хотите удалить это видео?")) return;

    try {
      const res = await fetch(`${API}/Videos/Delete/${videoId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error("Ошибка удаления");

      setVideos(prev => prev.filter(v => v.id !== videoId));
      alert("Видео удалено")
    } catch (err) {
      alert("Ошибка при удалении видео");
      console.error(err);
    }
  };

  const renderVideoRow = (video) => (
    <tr key={video.id}>
      <td className="CS-video-info">
        <img src={"http://localhost:5103" + video.thumbnailPath} alt={video.title} className="CS-thumbnail" />
      </td>
      <td>{video.title}</td>
      <td>{formatDateNumeric(video.uploadDate) || '-'}</td>
      <td>{video.viewCount}</td>
      <td>
        <button className="CS-btn CS-btn-edit" onClick={() => handleEdit(video)}>Изменить</button>
        <button className="CS-btn CS-btn-delete" onClick={() => handleDelete(video.id)}>Удалить</button>
      </td>
    </tr>
  );

  return (
    <div className="CS-page-container">
      <h1>Контент на канале</h1>

      <button className="CS-btn CS-btn-add" onClick={() => setIsModalOpen(true)}>
        Добавить видео
      </button>

      {isModalOpen && (
        <div className="CS-modal-overlay">
          <div className="CS-modal">
            <h3>{isEditing ? 'Редактировать видео' : 'Новое видео'}</h3>

            <div className="CS-modal-field">
              <label>Название видео:</label>
              <input
                placeholder="Введите название"
                value={newVideo.title}
                onChange={e => setNewVideo({ ...newVideo, title: e.target.value })}
              />
            </div>

            <div className="CS-modal-field">
              <label>Ссылка на видео (URL)</label>
              <input
                placeholder="Вставьте ссылку на видео"
                value={newVideo.filePath}
                onChange={e => setNewVideo({ ...newVideo, filePath: e.target.value })}
              />
            </div>

            <div className="CS-modal-field">
              <label>Описание</label>
              <textarea
                placeholder="Введите описание видео"
                value={newVideo.description}
                onChange={e => setNewVideo({ ...newVideo, description: e.target.value })}
                className="CS-description-textarea"
              />
            </div>

            <div className="CS-modal-field">
              <label>Превью (изображение)</label>
              <label className="CS-file-upload">
                <span>Загрузить превью</span>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </label>
              {newVideo.thumbnail && (
                <img
                  src={`${API}${newVideo.thumbnail}`}
                  alt="Предпросмотр превью"
                  className="CS-thumbnail-preview"
                />
              )}
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button className="CS-btn CS-btn-add" onClick={handleSaveVideo}>
                Сохранить
              </button>
              <button className="CS-btn CS-btn-delete" onClick={resetForm}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Загрузка видео...</p>
      ) : (
        <table className="CS-video-table">
          <thead>
            <tr>
              <th>Изображение</th>
              <th>Название</th>
              <th>Дата</th>
              <th>Просмотры</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(renderVideoRow)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChannelStudio;

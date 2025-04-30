import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./ChannelSettings.css";

const ChannelSettings = () => {
  const { id } = useParams();
  const username = Cookies.get("username");

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Поля формы
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [banner, setBanner] = useState("");

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:5103/Channels/Settings/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
          }
          return response.json();
        })
        .then(data => {
          data.picturePath = 'http://localhost:5103' + data.picturePath;
          data.bannerPath = 'http://localhost:5103' + data.bannerPath;

          setChannel(data);
          setName(data.name);
          setDescription(data.description != null ? data.description : "");
          setPicture(data.picturePath);
          setBanner(data.bannerPath);
        })
        .catch(error => {
          console.error('Ошибка при получении данных пользователя:', error);
        });
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <div className="not-owner-warning">Загрузка профиля...</div>;
  }

  if (!channel || id !== username) {
    return (
      <div className="not-owner-warning">
        Вы не можете редактировать этот профиль, ибо вы не являетесь его владельцем.
      </div>
    );
  }

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("channelId", channel.id);

    console.log(channel.id);
    try {
      await fetch("http://localhost:5103/Channels/Settings/upload", {
        method: "POST",
        body: formData,
      });

      if (type === "picture") {
        setPicture(URL.createObjectURL(file));
      } else {
        setBanner(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("http://localhost:5103/Channels/Settings/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: channel.Id,
          Name: name,
          Description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при сохранении настроек");
      }

      alert("Настройки успешно сохранены!");
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка при сохранении");
    }
  };

  return (
    <div className="channel-settings-container">
      <div
        className="channel-banner"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <label className="edit-icon">
          <img src="/images/icons/edit.png" alt="Edit Banner" />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleFileChange(e, "banner")}
          />
        </label>
        <div className="channel-avatar-wrapper">
          <img src={picture} alt="Avatar" className="channel-avatar" />
          <label className="edit-icon">
            <img src="/images/icons/edit.png" alt="Edit Avatar" />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleFileChange(e, "picture")}
            />
          </label>
        </div>
      </div>

      <div className="channel-settings-form">
        <h2>{name}</h2>
        <p className="channel-username">@{channel.id}</p>

        <label>DISPLAY NAME</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>ABOUT ME</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell something about you"
        />

        <button className="save-btn" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ChannelSettings;
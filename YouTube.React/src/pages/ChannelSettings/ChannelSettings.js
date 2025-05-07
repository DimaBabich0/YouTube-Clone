import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./ChannelSettings.css";

const ChannelSettings = () => {
  const { id } = useParams();
  const username = Cookies.get("username");

  const [channelData, setChannelData] = useState({
    id: id,
    name: '',
    description: '',
    picturePath: '',
    bannerPath: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5103/Channels/Settings/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
          }
          return response.json();
        })
        .then(data => {
          setChannelData(data);
        })
        .catch(error => {
          console.error('Ошибка при получении данных пользователя:', error);
        });
      setLoading(false);
    }
  }, [id]);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(channelData);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("channelId", channelData.id);

    try {
      const res = await fetch("http://localhost:5103/Channels/Settings/Upload", {
        method: "POST",
        body: formData,
      });

      var data = await res.json();

      if (type === "picture") {
        setChannelData((prev) => ({ ...prev, picturePath: data.path }));
      } else {
        setChannelData((prev) => ({ ...prev, bannerPath: data.path }));
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("http://localhost:5103/Channels/Settings/Update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: channelData.id,
          Name: channelData.name,
          Description: channelData.description,
          PicturePath: channelData.picturePath,
          BannerPath: channelData.bannerPath
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.errors) {
          alert(`Error: ${Object.values(errorData.errors).join(', ')}`);
        } else {
          throw new Error("An error occurred while showing error");
        }
      } else {
        alert("All changes saved successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving");
    }
  };

  // if (!channel || id !== username) {
  //   return (
  //     <div className="not-owner-warning">
  //       Вы не можете редактировать этот профиль, ибо вы не являетесь его владельцем.
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return <div className="not-owner-warning">Загрузка профиля...</div>;
  // }

  return (
    <div className="channel-settings-container">
      <div className='channel-banner'>
        <div className='banner-profile-section '>
          <img className='banner-profile-picture' src={"http://localhost:5103" + channelData.picturePath} alt='avatar'></img>
          <label className="edit-icon">
            <img src="/images/icons/edit.svg" alt="Edit Banner" />
            <input type="file" hidden accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e, "picture")} />
          </label>
        </div>
        <img className='banner-image' src={"http://localhost:5103" + channelData.bannerPath} alt='banner'></img>
        <label className="edit-banner-icon">
          <img src="/images/icons/edit.svg" alt="Edit Avatar" />
          <input type="file" hidden accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e, "banner")} />
        </label>
      </div>

      <div className="channel-settings-form">
        <div style={{ borderBottom: "1px solid #FFFFFF80" }} className="channel-settings-form-container">
          <h2>{channelData.name}</h2>
          <p className="channel-username">@{channelData.id}</p>
        </div>

        <div>
          <div className="channel-settings-form-container">
            <label>DISPLAY NAME</label>
            <input
              type="text"
              value={channelData.name}
              onChange={(e) =>
                setChannelData({ ...channelData, name: e.target.value })
              }
            />
          </div>

          <div className="channel-settings-form-container">
            <label>ABOUT ME</label>
            <textarea
              value={channelData.description}
              onChange={(e) =>
                setChannelData({ ...channelData, description: e.target.value })
              }
              placeholder="Tell something about you"
            />
          </div>
        </div>
      </div>
      
      <div>
        <button className="save-btn" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ChannelSettings;
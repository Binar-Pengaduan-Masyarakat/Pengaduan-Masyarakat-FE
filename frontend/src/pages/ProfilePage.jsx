// src/components/ProfilePage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './ProfilePage.css';
import ThemeSwitcher from './ThemeSwitcher';

const ProfilePage = () => {
  const { id } = useParams(); // Mengambil id dari URL params
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`); // Menggunakan id dari URL params
        setUser(response.data.data); // Sesuaikan dengan struktur respons API Anda
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = () => {
    alert('Delete Account Clicked');
  };

  const handleUpdate = () => {
    alert('Update Account Clicked');
  };

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setFile(file);
    handleUpload(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:3000/users/${id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Update user media URL after successful upload
      setUser(prevUser => ({
        ...prevUser,
        media: response.data.mediaUrl // Adjust this line according to your API response
      }));
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="content">
        <div className="content__cover">
          <div className="content__bull">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        <button onClick={() => handleUpload(file)} className="button upload-button">
          <div className="button__border"></div>
          <div className="button__bg"></div>
          <p className="button__text">Upload Media</p>
        </button>
        {user.media && (
          <div className="uploaded-media">
            <h3>Uploaded Media:</h3>
            <img src={user.media} alt="Uploaded Media" className="uploaded-media__img" />
          </div>
        )}
        <div className="content__title">
          <h1>Profile User</h1>
          <h2>{user.name}</h2>
        </div>
        <div className="content__description">
          <p><strong>Username:</strong> {user.userId}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong> {user.roles}</p>
        </div>
        <div className="content__button">
          <button className="button delete-button" onClick={handleDelete}>
            <div className="button__border"></div>
            <div className="button__bg"></div>
            <p className="button__text">Delete Account</p>
          </button>

          <button className="button update-button" onClick={handleUpdate}>
            <div className="button__border"></div>
            <div className="button__bg"></div>
            <p className="button__text">Update Account</p>
          </button>
        </div>
      </div>
      <div className="bg">
        <div>
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default ProfilePage;

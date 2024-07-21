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

  const handleEdit = () => {
    alert('Edit Profile Clicked');
  };

  const handleLogout = () => {
    alert('Logout Clicked');
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
        <div className="content__title">
          <h1>Profile User</h1>
          <div className="profile-image-container">
            {user.media ? (
              <img src={user.media} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-placeholder"></div>
            )}
            <div className="content__upload">
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
              </div>
            </div>
          </div>
          <h2>{user.name}</h2>
          <p className="user-id">{user.userId}</p>
        </div>
        <div className="content__description">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong> {user.roles}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="content__button">
          <button className="button edit-button" onClick={handleEdit}>
            <div className="button__border"></div>
            <div className="button__bg"></div>
            <p className="button__text">Edit Profile</p>
          </button>
  
          <button className="button logout-button" onClick={handleLogout}>
            <div className="button__border"></div>
            <div className="button__bg"></div>
            <p className="button__text">Logout</p>
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

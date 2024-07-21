// frontend/src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Tambahkan ini
import './UserProfile.css';

const UserProfile = () => {
  const { id } = useParams("US06242");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/${id}'); // Sesuaikan URL backend Anda
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = () => {
    alert('Delete Account Clicked');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile User</h1>
        <img className="profile-avatar" src={user.avatar || 'default-avatar.png'} alt={user.name} />
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.userId}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Roles:</strong> {user.roles}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <button className="delete-button" onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../css/page-user/profil.css";
import Profileimg from "../../../assets/image/profile.jpeg";
import axios from "axios";

const Profile = () => {

  // const { id } = useParams(); // Mengambil id dari URL
  // const [profile, setProfile] = useState({});
  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserId] = useState('');

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
      setUserId(user.email);
    }
  }, []);

  return (
    <div className="profil_cont">
      <h1>PROFIL</h1>
      <div className="profil_content">
        <div className="profile_img">
          <img src={Profileimg} alt="profil" />
        </div>
        <div className="profile_value">
          <h2>
            {userName}
          </h2>
          <p>{userEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

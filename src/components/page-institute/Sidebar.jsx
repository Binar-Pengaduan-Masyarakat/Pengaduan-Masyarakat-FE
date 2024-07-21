import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../css/page-institute/admin.css"
import avatar from '../../assets/image/profile.jpeg';

const AdminSidebar = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
    }
  }, []);
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <img src={avatar} alt="Admin Avatar" className="admin-avatar" />
        <div className="admin-info">
          <p>{userName}</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/reports">Management Laporan</Link></li>
          <li><Link to="/admin/analytics">Laporan Analitik</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;

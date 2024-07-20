import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/page-institute/admin.css"
import avatar from '../../assets/image/profile.jpeg';

const SuperAdmin = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <img src={avatar} alt="Admin Avatar" className="admin-avatar" />
        <div className="admin-info">
          <p>Nama Admin</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/superadmin">Dashboard</Link></li>
          <li><Link to="/admin/users">Management Users</Link></li>
          <li><Link to="/Superadmin/instansiManagement">Management Admin Instansi</Link></li>
          <li><Link to="/Superadmin/reports">Master Data Aduan</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default SuperAdmin;

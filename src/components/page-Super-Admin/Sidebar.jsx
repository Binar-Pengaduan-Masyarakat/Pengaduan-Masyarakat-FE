import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/page-institute/admin.css"
// import avatar from '../../assets/image/profile.jpeg';

const SuperAdmin = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
    }
  }, []);
  return (
    <div className="admin-sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/superadmin/dashboard">Dashboard</Link></li>
          <li><Link to="/superadmin/managementusers">Management Users</Link></li>
          <li><Link to="/superadmin/instansiManagement">Management Admin Instansi</Link></li>
          <li><Link to="/superadmin/reports">Master Data Aduan</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default SuperAdmin;

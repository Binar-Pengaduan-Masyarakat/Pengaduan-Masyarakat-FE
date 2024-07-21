import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/page-institute/admin.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import avatar from '../../assets/image/profile.jpeg';

const SuperAdmin = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    }
  }, []);
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        {/* <img src={avatar} alt="Admin Avatar" className="admin-avatar" /> */}
        <div className="admin-info">
          <p>{userName}</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/superadmin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/superadmin/managementusers">Management Users</Link>
          </li>
          <li>
            <Link to="/superadmin/instansiManagement">
              Management Admin Instansi
            </Link>
          </li>
          <li>
            <Link to="/superadmin/reports">Master Data Aduan</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SuperAdmin;

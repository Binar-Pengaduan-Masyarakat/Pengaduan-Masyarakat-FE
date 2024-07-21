import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/page-institute/admin.css";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import avatar from '../../assets/image/profile.jpeg';

const SuperAdmin = () => {
  const [userName, setUserName] = useState("");
  const [showSideBar, setshowSideBar] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    }
  }, []);

  const tooglersidebar = () => {
    setshowSideBar(!showSideBar);
  };
  return (
    <div className="cont-sidebar">
      <button onClick={tooglersidebar}>
        {" "}
        <i className="bi bi-list"></i>
      </button>
      <div className={`admin-sidebar ${showSideBar ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/superadmin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/superadmin/managementusers">Management Users</Link>
            </li>
            <li>
              <Link to="/superadmin/instansiManagement">Management Admin</Link>
            </li>
            <li>
              <Link to="/superadmin/reports">Master Data Aduan</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SuperAdmin;

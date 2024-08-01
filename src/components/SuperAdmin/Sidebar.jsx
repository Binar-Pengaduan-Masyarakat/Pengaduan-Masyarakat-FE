import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/public/css/SuperAdminManagement.css";

const SuperAdmin = () => {
  const [userName, setUserName] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    }
  }, []);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="cont-sidebar">
      <button onClick={toggleSideBar} aria-label="Toggle sidebar" className="sidebar-toggle">
        <i className="bi bi-list"></i>
      </button>
      <div className={`admin-sidebar ${showSideBar ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/superadmin/users" aria-label="Users Management">Users Management</Link>
            </li>
            <li>
              <Link to="/superadmin/institutions" aria-label="Institution Management">Institution Management</Link>
            </li>
            <li>
              <Link to="/superadmin/categories" aria-label="Categories Management">Categories Management</Link>
            </li>
            <li>
              <Link to="/superadmin/reports" aria-label="Reports Management">Reports Management</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SuperAdmin;

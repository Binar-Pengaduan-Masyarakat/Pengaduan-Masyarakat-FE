/** @format */

import { Outlet } from "react-router-dom";
import "/public/css/SuperAdmin.css";
import SuperAdminSidebar from "./Sidebar";

const SuperAdminpage = () => {
  return (
    <div className="admin-dashboard">
      <SuperAdminSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminpage;

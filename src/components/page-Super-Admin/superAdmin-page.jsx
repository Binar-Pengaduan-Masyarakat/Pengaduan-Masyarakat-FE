import { Outlet } from "react-router-dom";
import "../css/page-user/userpage.css";
import SuperAdminsidebar from "./Sidebar";

const SuperAdminpage = () => {
    return (
        <div className="admin-dashboard">
            <SuperAdminsidebar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default SuperAdminpage;

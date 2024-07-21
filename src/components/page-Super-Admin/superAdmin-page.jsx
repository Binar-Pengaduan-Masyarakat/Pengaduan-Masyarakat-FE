import "../../css/page-user/userpage.css";
import { Outlet } from "react-router-dom";
import SuperAdminsidebar from "./Sidebar";
import SuperAdminNavbar from "./Navbar";

const SuperAdminpage = () => {
    return (
        <div className="admin-dashboard">
            <SuperAdminsidebar />
            <div className="main-content">
                <SuperAdminNavbar />
                <Outlet />
            </div>
        </div>
    );
};

export default SuperAdminpage;

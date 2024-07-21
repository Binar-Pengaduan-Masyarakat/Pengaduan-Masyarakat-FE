import "../../css/page-user/userpage.css";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminNavbar from "./Navbar";

const Institutepage = () => {
    return (
        <div className="admin-dashboard">
            <AdminSidebar />
            <div className="main-content">
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Institutepage;

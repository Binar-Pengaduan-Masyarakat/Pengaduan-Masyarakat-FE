import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/page-user/content/Home";
import About from "../components/page-user/content/About";
import Userpage from "./page-user/User-page";
import LoginUser from "./page-login/LoginUser";
import LoginInstitute from "./page-login/LoginInstitute";
import Aduan from "./page-user/content/Aduan";
import Detreport from "./page-user/reports/DetReport";
import Register from "./page-login/Regidteruser";
import Profile from "./page-user/content/Profile";
import DashboardInstitute from "./page-institute/dashboard";
import DashboardSuperAdmin from "./page-Super-Admin/dashboard";
import MasterDataAduan from "./page-Super-Admin/master-data-aduan";
import ManagementUser from "./page-Super-Admin/management-user";
import ManagementInstansi from "./page-Super-Admin/management-instansi";
import ManagementReports from "./page-institute/management-reports";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bagian User */}
        <Route path="/" element={<LoginUser />}></Route>
        <Route path="/reg" element={<Register />}></Route>
        <Route path="/user" element={<Userpage />}>
          <Route path="" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="aduan" element={<Aduan />}></Route>
          <Route path="profil" element={<Profile />}></Route>
          <Route path="report/det" element={<Detreport />}></Route>
        </Route>

        {/* Bagian Institute */}
        <Route path="/admin/dashboard" element={<DashboardInstitute />}></Route>
        <Route path="/admin/reports" element={<ManagementReports />}></Route>
        <Route path="/admin" element={<LoginInstitute />}></Route>

        {/* Bagian Super Admin */}
        <Route path="/superadmin" element={<DashboardSuperAdmin />}></Route>
        <Route path="/Superadmin/reports" element={<MasterDataAduan />}></Route>
        <Route path="/admin/users" element={<ManagementUser />}></Route>
        <Route path="/Superadmin/instansiManagement" element={<ManagementInstansi />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

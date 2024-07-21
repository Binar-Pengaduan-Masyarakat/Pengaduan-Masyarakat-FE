import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/page-user/content/Home";
import About from "../components/page-user/content/About";
import Userpage from "./page-user/User-page";
import LoginUser from "./page-login/LoginUser";
import Aduan from "./page-user/content/Aduan";
import Detreport from "./page-user/reports/DetReport";
import Register from "./page-login/Regidteruser";
import EmailVerificaion from "./page-login/EmailVerification";
import VerificationSuccess from "./page-login/VerificationSuccess";
import Profile from "./page-user/content/Profile";
import DashboardInstitute from "./page-institute/dashboard";
import DashboardSuperAdmin from "./page-Super-Admin/dashboard";
import MasterDataAduan from "./page-Super-Admin/master-data-aduan";
import ManagementUser from "./page-Super-Admin/management-user";
import ManagementInstansi from "./page-Super-Admin/management-instansi";
import ManagementReports from "./page-institute/management-reports";
import PrivateRoute from "./PrivateRoute";
import Institutepage from "./page-institute/institute-page";
import SuperAdminpage from "./page-Super-Admin/superAdmin-page";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bagian User */}
        <Route path="/" element={<LoginUser />}></Route>
        <Route path="/reg" element={<Register />}></Route>
        <Route path="/emailVerification" element={<EmailVerificaion />}></Route>
        <Route path="/verificationSuccess" element={<VerificationSuccess />}></Route>

        <Route path="/user" element={<PrivateRoute element={<Userpage />} />}>
          <Route path="" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="aduan" element={<Aduan />}></Route>
          <Route path="profil" element={<Profile />}></Route>
          <Route path="report/det" element={<Detreport />}></Route>
        </Route>

        {/* Bagian Institute */}
        <Route path="/admin" element={<PrivateRoute element={<Institutepage />} />}>
          <Route path="dashboard" element={<DashboardInstitute />}></Route>
          <Route path="reports" element={<ManagementReports />}></Route>
        </Route>

        {/* Bagian Super Admin */}
        <Route path="/superadmin" element={<PrivateRoute element={<SuperAdminpage />} />}>
          <Route path="dashboard" element={<DashboardSuperAdmin />}></Route>
          <Route path="reports" element={<MasterDataAduan />}></Route>
          <Route path="managementusers" element={<ManagementUser />}></Route>
          <Route path="instansiManagement" element={<ManagementInstansi />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

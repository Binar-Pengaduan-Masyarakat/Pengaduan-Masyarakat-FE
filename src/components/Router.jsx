import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/page-user/content/Home";
import About from "../components/page-user/content/About";
import Userpage from "./page-user/User-page";
import LoginUser from "./page-login/LoginUser";
import LoginInstitute from "./page-login/LoginInstitute";
import Aduan from "./page-user/content/Aduan";
import Detreport from "./page-user/reports/DetReport";
import Register from "./page-login/Regidteruser";
import EmailVerificaion from "./page-login/EmailVerification";
import VerificationSuccess from "./page-login/VerificationSuccess";
import Profile from "./page-user/content/Profile";
import DashboardInstitute from "./page-institute/dashboard";
import PrivateRoute from "./PrivateRoute";
import Superadmin from "./page-login/Superadmin";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bagian User */}
        <Route path="/" element={<LoginUser />}></Route>
        <Route path="/reg" element={<Register />}></Route>
        <Route path="/emailVerification" element={<EmailVerificaion />}></Route>
        <Route path="/verificationSuccess" element={<VerificationSuccess />}></Route>
        <Route path="/dashboardInstitute" element={<DashboardInstitute />}></Route>

        <Route path="/superadmin" element={<Superadmin />}></Route>
        
        <Route path="/user" element={<PrivateRoute element={<Userpage />} />}>
          <Route path="" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="aduan" element={<Aduan />}></Route>
          <Route path="profil/:id" element={<Profile />}></Route>
          <Route path="report/det" element={<Detreport />}></Route>
        </Route>

        {/* Bagian Admin */}
        <Route path="/admin" element={<LoginInstitute />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

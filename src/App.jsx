import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportsTable from "./components/ReportsTable";
import ReportDetailsPage from "./components/ReportDetails";
import RegisterUser from "./components/RegisterUserPage";
import LoginPage from "./components/LoginPage";
import EmailVerification from "./components/EmailVerification";
import EmailVerificationSuccess from "./components/EmailVerificationSuccess";
import { Container } from "react-bootstrap";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import "./styles.css";
import SuperAdminpage from "./components/page-Super-Admin/superAdmin-page";
import ManagementUser from "./components/page-Super-Admin/management-user";
import ManagementInstansi from "./components/page-Super-Admin/management-instansi";
import MasterDataAduan from "./components/page-Super-Admin/master-data-aduan";
import PrivateRoute from "./components/PrivateRoute";
import DashboardSuperAdmin from "./components/page-Super-Admin/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<ReportsTable />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route
            path="/verificationSuccess"
            element={<EmailVerificationSuccess />}
          />
          <Route
            path="/report-details/:reportId"
            element={<ReportDetailsPage />}
          />
          <Route path="/users/:userId" element={<UserProfile />} />

          <Route path="/superadmin" element={<PrivateRoute element={<SuperAdminpage />} isLoginPage={false} />}>
            <Route path="dashboard" element={<DashboardSuperAdmin />} />
            <Route path="reports" element={<MasterDataAduan />} />
            <Route path="managementusers" element={<ManagementUser />} />
            <Route path="instansiManagement" element={<ManagementInstansi />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import "./styles.css";
import PrivateRoute from "./components/PrivateRoute";

import ReportsTable from "./components/ReportsTable";
import ReportDetailsPage from "./components/ReportDetails";
import RegisterUser from "./components/RegisterUserPage";
import LoginPage from "./components/LoginPage";
import EmailVerification from "./components/EmailVerification";
import EmailVerificationSuccess from "./components/EmailVerificationSuccess";
import SuperAdminpage from "./components/SuperAdmin/SuperAdmin";
import MasterDataAduan from "./components/SuperAdmin/sidebar/ReportsManagement";
import ManagementUser from "./components/SuperAdmin/sidebar/UsersManagement";
import ManagementInstansi from "./components/SuperAdmin/sidebar/InstitutionManagement";
import ManagementCategory from "./components/SuperAdmin/sidebar/CategoriesManagement";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>

          <Route path="/login" element={<PrivateRoute element={<LoginPage />} isLoginPage={true} />} />
          <Route path="/" element={<ReportsTable />} />
          <Route path="/register" element={<PrivateRoute element={<RegisterUser />} isLoginPage={true} />} />
          <Route path="/verify-email" element={<PrivateRoute element={<EmailVerification />} isLoginPage={true} />} />
          <Route path="/verificationSuccess" element={<PrivateRoute element={<EmailVerificationSuccess />} isLoginPage={true} />} />
          <Route path="/report-details/:reportId" element={<ReportDetailsPage />} />

          <Route path="/superadmin" element={<PrivateRoute element={<SuperAdminpage />} isLoginPage={false} />}>
            <Route path="reports" element={<MasterDataAduan />} />
            <Route path="users" element={<ManagementUser />} />
            <Route path="institutions" element={<ManagementInstansi />} />
            <Route path="categories" element={<ManagementCategory />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
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
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

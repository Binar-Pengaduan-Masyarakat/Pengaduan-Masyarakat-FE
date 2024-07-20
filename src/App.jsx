import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportsTable from "./components/ReportsTable";
import ReportDetailsPage from "./components/ReportDetails";
import { Container } from "react-bootstrap";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<ReportsTable />} />
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

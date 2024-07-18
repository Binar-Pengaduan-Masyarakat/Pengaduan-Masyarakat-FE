import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportsTable from "./components/reportsTable";
import ReportDetailsPage from "./components/reportDetails";
import { Container } from "react-bootstrap";

import Header from "./components/header";

function App() {
  return (
    <div>
      {" "}
      <Header />
      <Container>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<ReportsTable />} />
              <Route
                path="/report-details/:reportId"
                element={<ReportDetailsPage />}
              />
            </Routes>
          </div>
        </Router>
      </Container>
    </div>
  );
}

export default App;

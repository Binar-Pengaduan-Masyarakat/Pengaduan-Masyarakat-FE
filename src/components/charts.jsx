import React, { useState, useEffect } from "react";
import ReportSummary from "./charts/reportSummary";
import UserCategory from "./charts/userCategory";
import UserRoleChart from "./charts/userRole";
import { Row, Col, Button } from "react-bootstrap";

const Charts = () => {
  const [showCharts, setShowCharts] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowCharts(!isPortrait);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid">
      {window.innerHeight > window.innerWidth && (
        <Button
          variant="danger"
          onClick={() => setShowCharts(!showCharts)}
          style={{
            width: "100%",
            marginTop: "10px",
            backgroundColor: "#343a40",
            borderStyle: "none",
          }}
        >
          {showCharts ? "Hide Charts" : "Show Charts"}
        </Button>
      )}
      {showCharts && (
        <Row>
          <Col xs={12} md={4}>
            <ReportSummary />
          </Col>
          <Col xs={12} md={4}>
            <UserCategory />
          </Col>
          <Col xs={12} md={4}>
            <UserRoleChart />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Charts;

/** @format */

import React, { useState, useEffect, useContext } from "react";
import Charts from "./Charts/CombinedCharts";
import CreateReportModal from "./Modal/CreateReportModal";
import { format } from "date-fns";
import { UserContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/ReportsTable.css";
import { Link } from "react-router-dom";
import { Container, Button, Dropdown, Table, Form } from "react-bootstrap";

const ReportsTable = () => {
  const { userId } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [sortedReports, setSortedReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [upvotes, setUpvotes] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchReports();
    fetchUpvotes();
    if (userId.startsWith("IN")) fetchUserCategories();
  }, [userId]);

  useEffect(() => {
    filterReportsByCategory();
  }, [userCategories, reports]);

  useEffect(() => {
    filterReportsBySearchTerm();
  }, [searchTerm, sortedReports]);
  const fetchReports = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reports`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setReports(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUpvotes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/sameReporter/count`
      );
      if (!response.ok) throw new Error("Failed to fetch upvotes");
      const data = await response.json();
      const upvotesCount = data.data.count.reduce((acc, item) => {
        acc[item.reportId] = (acc[item.reportId] || 0) + 1;
        return acc;
      }, {});
      setUpvotes(upvotesCount);
    } catch (error) {
      console.error("Error fetching upvotes:", error);
    }
  };

  const fetchUserCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/user/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch user categories");
      const data = await response.json();
      setUserCategories(data.map((category) => category.categoryId));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterReportsByCategory = () => {
    const filteredReports =
      userCategories.length > 0
        ? reports.filter((report) => userCategories.includes(report.categoryId))
        : reports;
    setSortedReports(filteredReports);
  };

  const filterReportsBySearchTerm = () => {
    const filtered = sortedReports.filter((report) => {
      const searchFields = [
        report.reportContent,
        report.district,
        report.subdistrict,
        report.address,
        format(new Date(report.createdAt), "MMMM dd, yyyy 'at' HH:mm"),
      ];
      return searchFields.some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredReports(filtered);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
    const sortedData = [...filteredReports].sort((a, b) => {
      if (key === "upvotes") {
        return direction === "asc"
          ? (upvotes[a.reportId] || 0) - (upvotes[b.reportId] || 0)
          : (upvotes[b.reportId] || 0) - (upvotes[a.reportId] || 0);
      } else {
        const aValue = a[key] || "";
        const bValue = b[key] || "";

        if (direction === "asc") {
          return typeof aValue === "string"
            ? aValue.localeCompare(bValue)
            : aValue - bValue;
        } else {
          return typeof aValue === "string"
            ? bValue.localeCompare(aValue)
            : bValue - aValue;
        }
      }
    });

    setFilteredReports(sortedData);
  };

  const handleReportCreated = () => {
    fetchReports();
  };

  return (
    <div>
      <Charts />
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="my-3">Reports List</h3>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Search..."
                className="mr-2"
                style={{ margin: "0 10px 0 10px", paddingRight: "1px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Dropdown className="mr-2">
                <Dropdown.Toggle variant="secondary" id="sortDropdown">
                  Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSort("createdAt")}>
                    Time Posted
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("upvotes")}>
                    Upvotes
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {userId?.startsWith("US") && (
              <Button
                variant="danger"
                className="create-report-button"
                style={{
                  backgroundColor: "#343a40",
                  borderStyle: "none",
                  marginLeft: "10px",
                  height: "100%",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setShowCreateReportModal(true)}>
                Create Report
              </Button>
            )}
          </div>
        </div>
        <div
          className="table-container"
          style={{
            overflowY: "auto",
            display: "block",
          }}>
          <Table striped bordered hover style={{ tableLayout: "auto" }}>
            <thead className="thead-dark">
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    width: "1%",
                  }}>
                  Upvotes
                </th>
                <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  Content
                </th>
                <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  District
                </th>
                <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  Subdistrict
                </th>
                <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  Address
                </th>
                <th
                  style={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    width: "1%",
                  }}>
                  Time Posted
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.reportId}
                  style={
                    report.userId === userId
                      ? { backgroundColor: "#f0f8ff" }
                      : {}
                  }>
                  <td
                    style={{
                      width: "100px",
                      textAlign: "center",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                    }}>
                    {upvotes[report.reportId] || 0}
                  </td>
                  <td
                    className="report-content"
                    title={report.reportContent}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}>
                    <Link to={`/report-details/${report.reportId}`}>
                      {report.reportContent}
                    </Link>
                  </td>
                  <td title={report.district} style={{ whiteSpace: "nowrap" }}>
                    {report.district}
                  </td>
                  <td
                    title={report.subdistrict}
                    style={{ whiteSpace: "nowrap" }}>
                    {report.subdistrict}
                  </td>
                  <td title={report.address} style={{}}>
                    {report.address}
                  </td>
                  <td style={{ whiteSpace: "nowrap", width: "1%" }}>
                    {format(
                      new Date(report.createdAt),
                      "MMMM dd, yyyy 'at' HH:mm"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {showCreateReportModal && (
          <CreateReportModal
            onClose={() => setShowCreateReportModal(false)}
            onReportCreated={handleReportCreated}
          />
        )}
      </Container>
    </div>
  );
};
export default ReportsTable;

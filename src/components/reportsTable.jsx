import React, { useState, useEffect, useContext } from "react";
import Charts from "./charts";
import CreateReport from "./createReport";
import { format } from "date-fns";
import { UserContext } from "./userContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/reportsTable.css";

const ReportsTable = () => {
  const { userId } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [sortedReports, setSortedReports] = useState([]);
  const [upvotes, setUpvotes] = useState({});
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showCreateReport, setShowCreateReport] = useState(false);

  useEffect(() => {
    fetchReports();
    fetchUpvotes();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reports`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setReports(data.data);
      setSortedReports(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUpvotes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/sameReporter/count`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch upvotes");
      }
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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    const sortedData = [...reports].sort((a, b) => {
      if (column === "upvotes") {
        if (sortDirection === "asc") {
          return (upvotes[a.reportId] || 0) - (upvotes[b.reportId] || 0);
        } else {
          return (upvotes[b.reportId] || 0) - (upvotes[a.reportId] || 0);
        }
      } else {
        if (sortDirection === "asc") {
          return a[column].localeCompare(b[column]);
        } else {
          return b[column].localeCompare(a[column]);
        }
      }
    });

    setSortedReports(sortedData);
  };

  const handleReportCreated = () => {
    fetchReports();
  };

  return (
    <div>
      <Charts />
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 style={{ margin: "2vh 0px 2vh 0px" }}>Reports List</h3>
          {userId && (
            <button
              className="btn btn-danger create-report-button"
              style={{ backgroundColor: "#343a40", borderStyle: "none" }}
              onClick={() => setShowCreateReport(true)}
            >
              Create Report
            </button>
          )}
        </div>
        <div className="table-container">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th
                  style={{ textAlign: "left", cursor: "pointer" }}
                  onClick={() => handleSort("createdAt")}
                >
                  Posted At
                  {sortColumn === "createdAt" && (
                    <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("reportContent")}
                >
                  Content
                  {sortColumn === "reportContent" && (
                    <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("district")}
                >
                  District
                  {sortColumn === "district" && (
                    <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("subdistrict")}
                >
                  Subdistrict
                  {sortColumn === "subdistrict" && (
                    <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("address")}
                >
                  Address
                  {sortColumn === "address" && (
                    <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
                <th
                  style={{
                    cursor: "pointer",
                    width: "100px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => handleSort("upvotes")}
                >
                  Upvotes
                  {sortColumn === "upvotes" && (
                    <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedReports.map((report) => (
                <tr
                  key={report.reportId}
                  style={
                    report.userId === userId
                      ? { backgroundColor: "#f0f8ff" }
                      : {}
                  }
                >
                  <td style={{ textAlign: "left" }}>
                    {report
                      ? format(new Date(report.createdAt), "MMMM dd, yyyy")
                      : ""}
                  </td>
                  <td
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={report.reportContent}
                    onClick={() =>
                      (window.location.href = `/report-details/${report.reportId}`)
                    }
                  >
                    {report.reportContent}
                  </td>
                  <td
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={report.district}
                  >
                    {report.district}
                  </td>
                  <td
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={report.subdistrict}
                  >
                    {report.subdistrict}
                  </td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={report.address}
                  >
                    {report.address}
                  </td>
                  <td>{upvotes[report.reportId] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCreateReport && (
          <CreateReport
            onClose={() => setShowCreateReport(false)}
            onReportCreated={handleReportCreated}
          />
        )}
      </div>
    </div>
  );
};

export default ReportsTable;

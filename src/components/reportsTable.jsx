import React, { useState, useEffect } from "react";
import Charts from "./charts";
import CreateReport from "./createReport";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/reportsTable.css";

const ReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [sortedReports, setSortedReports] = useState([]);
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showCreateReport, setShowCreateReport] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reports");
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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }

    const sortedData = [...reports].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column].localeCompare(b[column]);
      } else {
        return b[column].localeCompare(a[column]);
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
          <h2 style={{ margin: "2vh 0px 2vh 0px" }}>Reports</h2>
          <button
            className="btn btn-danger"
            style={{ backgroundColor: "#343a40", borderStyle: "none" }}
            onClick={() => setShowCreateReport(true)}
          >
            Create Report
          </button>
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
                  Report Content
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
              </tr>
            </thead>
            <tbody>
              {sortedReports.map((report) => (
                <tr key={report.reportId}>
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

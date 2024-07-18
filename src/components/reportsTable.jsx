import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Charts from "./charts";
import "bootstrap/dist/css/bootstrap.min.css";

const formatDate = (dateString, userTimezone) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const ReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [sortedReports, setSortedReports] = useState([]);
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("asc");

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

  return (
    <div>
      <Charts></Charts>
      <div className="container mt-3">
        <h2>Reports</h2>
        <table className="table table-striped table-hover">
          <thead>
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
                  <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report, index) => (
              <tr key={report.reportId}>
                <td style={{ textAlign: "left" }}>
                  {formatDate(
                    report.createdAt,
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  )}
                </td>
                <td
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() =>
                    (window.location.href = `/report-details/${report.reportId}`)
                  }
                >
                  {report.reportContent}
                </td>
                <td>{report.district}</td>
                <td>{report.subdistrict}</td>
                <td>{report.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;

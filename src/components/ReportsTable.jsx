import React, { useState, useEffect, useContext } from "react";
import Charts from "./Charts/CombinedCharts";
import CreateReportModal from "./Modal/CreateReportModal";
import { format } from "date-fns";
import { UserContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/ReportsTable.css";

const ReportsTable = () => {
  const { userId } = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const [sortedReports, setSortedReports] = useState([]);
  const [upvotes, setUpvotes] = useState({});
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const [userCategories, setUserCategories] = useState([]);

  useEffect(() => {
    fetchReports();
    fetchUpvotes();
    if (userId.startsWith("IN")) fetchUserCategories();
  }, [userId]);

  useEffect(() => {
    filterReportsByCategory();
  }, [userCategories, reports]);

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
    if (userCategories.length > 0) {
      setSortedReports(
        reports.filter((report) => userCategories.includes(report.categoryId))
      );
    } else {
      setSortedReports(reports);
    }
  };

  const handleSort = (column) => {
    const normalizedColumn = {
      Date: "createdAt",
      Content: "reportContent",
      District: "district",
      Subdistrict: "subdistrict",
      Address: "address",
      Upvotes: "upvotes",
    }[column];

    const direction =
      sortColumn === normalizedColumn
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setSortColumn(normalizedColumn);
    setSortDirection(direction);

    const sortedData = [...reports].sort((a, b) => {
      if (normalizedColumn === "upvotes") {
        return direction === "asc"
          ? (upvotes[a.reportId] || 0) - (upvotes[b.reportId] || 0)
          : (upvotes[b.reportId] || 0) - (upvotes[a.reportId] || 0);
      } else {
        const aValue = a[normalizedColumn] || "";
        const bValue = b[normalizedColumn] || "";

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
          <h3 className="my-3">Reports List</h3>
          {userId?.startsWith("US") && (
            <button
              className="btn btn-danger create-report-button"
              style={{ backgroundColor: "#343a40", borderStyle: "none" }}
              onClick={() => setShowCreateReportModal(true)}
            >
              Create Report
            </button>
          )}
        </div>
        <div className="table-container">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                {[
                  "Date",
                  "Content",
                  "District",
                  "Subdistrict",
                  "Address",
                  "Upvotes",
                ].map((column) => (
                  <th
                    key={column}
                    style={{
                      cursor: "pointer",
                      textAlign: column === "Date" ? "left" : "center",
                    }}
                    onClick={() => handleSort(column)}
                  >
                    {column}
                    {sortColumn === column && (
                      <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                    )}
                  </th>
                ))}
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
                  <td>{format(new Date(report.createdAt), "MMMM dd, yyyy")}</td>
                  <td
                    className="report-content"
                    onClick={() =>
                      (window.location.href = `/report-details/${report.reportId}`)
                    }
                    title={report.reportContent}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {report.reportContent}
                  </td>
                  <td title={report.district}>{report.district}</td>
                  <td title={report.subdistrict}>{report.subdistrict}</td>
                  <td title={report.address}>{report.address}</td>
                  <td
                    style={{
                      width: "100px",
                      textAlign: "center",
                      minWidth: "100px",
                      maxWidth: "100px",
                    }}
                  >
                    {upvotes[report.reportId] || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCreateReportModal && (
          <CreateReportModal
            onClose={() => setShowCreateReportModal(false)}
            onReportCreated={handleReportCreated}
          />
        )}
      </div>
    </div>
  );
};

export default ReportsTable;

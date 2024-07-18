import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportProgressTracker from "./reportProgress";

const ReportDetailsPage = () => {
  const { reportId } = useParams();
  const [reportDetails, setReportDetails] = useState(null);
  const [progressColor, setProgressColor] = useState("black");
  useEffect(() => {
    fetchReportDetails(reportId);
  }, [reportId]);

  const fetchReportDetails = async (reportId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reports/${reportId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch report details");
      }
      const data = await response.json();
      setReportDetails(data.data);
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };

  const formatDate = (dateString, userTimezone) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: userTimezone,
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Report Details</h2>
      {reportDetails ? (
        <div>
          <div className="card mt-4 shadow-sm">
            <div
              className="card-header"
              style={{ backgroundColor: progressColor }}
            >
              <ReportProgressTracker
                reportId={reportId}
                setProgressColor={setProgressColor}
              />
            </div>
            <div className="card-body">
              <p className="card-text mt-3">
                <strong>Report Content:</strong> {reportDetails.reportContent}
              </p>
              {reportDetails.reportImage && (
                <div className="text-center my-3">
                  <img
                    src={reportDetails.reportImage}
                    alt="Report"
                    className="img-fluid rounded"
                  />
                </div>
              )}
              <p className="card-text">
                <strong>User:</strong> {reportDetails.userId}
              </p>
              <p className="card-text">
                <strong>District:</strong> {reportDetails.district}
              </p>
              <p className="card-text">
                <strong>Subdistrict:</strong> {reportDetails.subdistrict}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {reportDetails.address}
              </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <div>
                <h6 className="mb-0 text-muted">
                  {reportDetails.reportId} - {reportDetails.categoryId}
                </h6>
              </div>
              <div className="text-end">
                <h6 className="mb-0 text-muted">
                  {formatDate(
                    reportDetails.createdAt,
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  )}
                </h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ReportDetailsPage;

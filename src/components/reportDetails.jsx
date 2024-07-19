import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import ReportProgressTracker from "./reportProgress";

const ReportDetailsPage = () => {
  const { reportId } = useParams();
  const [reportDetails, setReportDetails] = useState(null);
  const [progressColor, setProgressColor] = useState("black");
  const [submitterName, setSubmitterName] = useState(null);
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
      fetchSubmitterName(data.data.userId);
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };

  const fetchSubmitterName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setSubmitterName(data.data.name);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchReportDetails(reportId);
  }, [reportId]);
  return (
    <div className="container mt-5">
      <h2 className="text-left mb-4">Report Details</h2>
      {reportDetails ? (
        <div>
          <div className="card mt-4 shadow-sm">
            <div className="card-header">
              <ReportProgressTracker
                reportId={reportId}
                setProgressColor={setProgressColor}
              />
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Submitter:</strong> {submitterName}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {reportDetails.address},{" "}
                {reportDetails.subdistrict}, {reportDetails.district}
              </p>
              <p className="card-text">
                <strong>Report Content:</strong>
              </p>{" "}
              <textarea
                className="form-control"
                value={reportDetails.reportContent}
                readOnly
                style={{ resize: "none" }}
              />
              {reportDetails.reportImage && (
                <div className="text-center my-3">
                  <img
                    src={`http://localhost:3000/reports/${reportDetails.reportImage}`}
                    alt="Report"
                    className="img-fluid rounded"
                  />
                </div>
              )}
            </div>
            <div className="card-footer d-flex justify-content-between">
              <div>
                <h6 className="mb-0 text-muted">
                  {reportDetails.reportId} - {reportDetails.categoryId}
                </h6>
              </div>
              <div className="text-end">
                <h6 className="mb-0 text-muted">
                  {reportDetails
                    ? format(
                        new Date(reportDetails.createdAt),
                        "MMMM dd, yyyy HH:mm aa zzz"
                      )
                    : ""}
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import ReportProgressTracker from "./ReportProgress";
import TruncatedText from "./TruncatedText";
import "/public/css/ReportDetails.css";
import ModalImage from "react-modal-image";
import SameReporter from "./SameReporter";
import ReportResponse from "./ReportResponse";

const ReportDetailsPage = () => {
  const { reportId } = useParams();
  const [reportDetails, setReportDetails] = useState(null);
  const [progressColor, setProgressColor] = useState("black");
  const [submitterName, setSubmitterName] = useState(null);
  const [reportResponses, setReportResponses] = useState(null);
  const [reportResult, setReportResult] = useState(null);

  useEffect(() => {
    fetchReportDetails(reportId);
  }, [reportId]);

  const fetchReportDetails = async (reportId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reports/${reportId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch report details");
      }
      const data = await response.json();
      setReportDetails(data.data);
      fetchSubmitterName(data.data.userId);
      fetchReportData(reportId);
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };

  const fetchSubmitterName = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setSubmitterName(data.data.name);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchReportData = async (reportId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/reportResponses/report/${reportId}`
      );
      const responseData = await response.json();
      setReportResponses(responseData.data);

      const resultResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reportResults/${reportId}`
      );
      const resultData = await resultResponse.json();
      setReportResult(resultData.data);
    } catch (error) {
      console.error("Error fetching report responses or results:", error);
    }
  };

  const handleRefresh = () => {
    fetchReportDetails(reportId);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-left mb-0">Report Details</h3>
        <div className="d-flex justify-content-end">
          <SameReporter reportId={reportId} />
          <ReportResponse
            reportId={reportId}
            onDataChange={handleRefresh} // Pass refresh function
          />
        </div>
      </div>
      {reportDetails ? (
        <div className="card mt-4 shadow-sm">
          <div className="card-header">
            <ReportProgressTracker
              reportId={reportId}
              setProgressColor={setProgressColor}
            />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <p className="card-text">
                  <strong>Submitter:</strong>
                  <span>
                    <TruncatedText text={submitterName || ""} maxLength={100} />
                  </span>
                </p>
                <p className="card-text">
                  <strong>District:</strong>
                  <TruncatedText
                    text={reportDetails.district || ""}
                    maxLength={100}
                  />
                </p>
                <p className="card-text">
                  <strong>Subdistrict:</strong>
                  <TruncatedText
                    text={reportDetails.subdistrict || ""}
                    maxLength={100}
                  />
                </p>
                <p className="card-text">
                  <strong>Address:</strong>
                  <TruncatedText
                    text={reportDetails.address || ""}
                    maxLength={100}
                  />
                </p>
                <p className="card-text" style={{ marginBottom: "5px" }}>
                  <strong>Report Content:</strong>
                  <TruncatedText
                    text={reportDetails.reportContent || ""}
                    maxLength={255}
                  />
                </p>
              </div>
              <div className="col-md-4 text-center my-3 d-flex align-items-center justify-content-center">
                {reportDetails.reportImage ? (
                  <ModalImage
                    small={`${import.meta.env.VITE_BACKEND_URL}/reports/${
                      reportDetails.reportImage
                    }`}
                    large={`${import.meta.env.VITE_BACKEND_URL}/reports/${
                      reportDetails.reportImage
                    }`}
                    alt="Report"
                    className="report-image img-fluid rounded"
                  />
                ) : (
                  <div className="placeholder-image">
                    <p>No image submitted</p>
                  </div>
                )}
              </div>
            </div>
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
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ReportDetailsPage;

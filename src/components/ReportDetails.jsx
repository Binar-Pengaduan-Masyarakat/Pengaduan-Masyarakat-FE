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
  const [categoryName, setCategoryName] = useState(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    fetchReportDetails();
    return () => {
      setIsMounted(false);
    };
  }, [reportId]);

  const fetchReportDetails = async () => {
    try {
      const reportResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reports/${reportId}`
      );
      if (!reportResponse.ok) throw new Error("Failed to fetch report details");
      const reportData = await reportResponse.json();
      if (isMounted) {
        setReportDetails(reportData.data);
      }

      if (reportData.data?.userId) {
        const submitterResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            reportData.data.userId
          }`
        );
        if (!submitterResponse.ok)
          throw new Error("Failed to fetch user details");

        const submitterData = await submitterResponse.json();
        if (isMounted) {
          setSubmitterName(submitterData.data.name);
        }
      } else {
        if (isMounted) {
          setSubmitterName(null);
        }
      }

      const reportDataResponse = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/reportResponses/report/${reportId}`
      );
      if (!reportDataResponse.ok)
        throw new Error("Failed to fetch report responses");

      const reportResponsesData = await reportDataResponse.json();
      if (isMounted) {
        setReportResponses(reportResponsesData.data);
      }

      const resultResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reportResults/${reportId}`
      );
      if (!resultResponse.ok) throw new Error("Failed to fetch report results");

      const resultData = await resultResponse.json();
      if (isMounted) {
        setReportResult(resultData.data);
      }

      if (reportData.data?.categoryId) {
        const categoryResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories/${
            reportData.data.categoryId
          }`,
          {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
        if (!categoryResponse.ok)
          throw new Error("Failed to fetch category details");

        const categoryData = await categoryResponse.json();
        console.log("Category Data:", categoryData); // Debugging statement
        if (isMounted) {
          setCategoryName(categoryData[0].categoryName);
        }
      } else {
        setCategoryName(null);
      }
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };

  const handleRefresh = () => {
    fetchReportDetails();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-left mb-0">Report Details</h3>
        <div className="d-flex justify-content-end">
          <SameReporter reportId={reportId} />
          <ReportResponse reportId={reportId} onDataChange={handleRefresh} />
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
                {reportDetails.reportId} - {reportDetails.categoryId} -{" "}
                {categoryName}
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
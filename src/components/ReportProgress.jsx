/** @format */

import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportProgressTracker = ({ reportId, setProgressColor }) => {
  const [reportData, setReportData] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [resultData, setResultData] = useState(null);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchReportData(),
        fetchResponseData(),
        fetchResultData(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [reportId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchReportData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reports/${reportId}`
      );
      if (!response.ok) throw new Error("Failed to fetch report data");
      const { data } = await response.json();
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const fetchResponseData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/reportResponses/report/${reportId}`
      );
      if (!response.ok) throw new Error("Failed to fetch response data");
      const { data } = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching response data:", error);
    }
  };

  const fetchResultData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reportResults/${reportId}`
      );
      if (!response.ok) throw new Error("Failed to fetch result data");
      const { data, message } = await response.json();
      if (message === "Report Result not found") {
        setResultNotFound(true);
      } else {
        setResultData(data);
      }
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  const isReportSubmitted = reportData !== null;
  const isInProgress = responseData.length > 0;
  const isReportFinished = resultData !== null && !resultNotFound;

  let progressText = "Report Submitted";
  let progressColor = "red";

  if (isInProgress) {
    progressText = "Investigation Ongoing";
    progressColor = "blue";
  }

  if (isReportFinished) {
    progressText = "Report Finished";
    progressColor = "green";
  }

  useEffect(() => {
    setProgressColor(progressColor);
  }, [progressColor, setProgressColor]);

  return (
    <div
      style={{
        color: progressColor,
        padding: "5px",
        borderRadius: "5px",
        textAlign: "right",
        fontSize: "1em",
        fontWeight: "bold",
      }}>
      {progressText}
    </div>
  );
};
export default ReportProgressTracker;

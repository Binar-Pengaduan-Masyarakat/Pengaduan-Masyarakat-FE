import React, { useState, useEffect } from "react";
import axios from "axios";

const SameReporterButton = () => {
  const [reportId, setReportId] = useState("");
  const [userId, setUserId] = useState("");
  const [canReport, setCanReport] = useState(null);
  const [isPoster, setIsPoster] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reportId && userId) {
      const checkSameReporter = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/sameReporter/${reportId}/${userId}`
          );
          const { data } = response.data;
          setCanReport(data.canReport);
          setIsPoster(data.isPoster);
        } catch (error) {
          console.error(error);
        }
      };
      checkSameReporter();
    }
  }, [reportId, userId]);

  useEffect(() => {
    if (reportId) {
      const getCount = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/sameReporter/count/${reportId}`
          );
          const { data } = response.data;
          setCount(data.count);
        } catch (error) {
          console.error(error);
        }
      };
      getCount();
    }
  }, [reportId]);

  const handleReport = async () => {
    if (!reportId || !userId) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/sameReporter/${reportId}`,
        {
          userId,
        }
      );
      setCanReport(false);
      setCount(parseInt(count) + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRetract = async () => {
    if (!reportId || !userId) return;
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/sameReporter/delete/${reportId}`,
        {
          userId,
        }
      );
      setCanReport(true);
      setCount(count - 1);
    } catch (error) {
      console.error(error);
    }
  };

  if (isPoster) return <div>Poster</div>;

  return (
    <div>
      <input
        type="text"
        value={reportId}
        onChange={(e) => setReportId(e.target.value)}
        placeholder="Enter Report ID"
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
      {canReport !== null && (
        <>
          {canReport ? (
            <button onClick={handleReport}>Report as Same</button>
          ) : (
            <button onClick={handleRetract}>Retract</button>
          )}
          <span>{count} Same Reporters</span>
        </>
      )}
    </div>
  );
};

export default SameReporterButton;

import React, { useState, useCallback } from "react";
import UseChartData from "./hooks/UseChartData";
import DonutChartTemplate from "./templates/DonutChartTemplate";

const InstitutionStatistic = () => {
  const [userId, setUserId] = useState("");
  const [url, setUrl] = useState("");
  const { chartData, loading, error } = UseChartData(url);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setUrl(
        `${import.meta.env.VITE_BACKEND_URL}/api/charts/institution/${userId}`
      );
    },
    [userId]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          placeholder="Enter User ID"
        />
        <button type="submit">Submit</button>
      </form>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-danger">Error: {error.message}</div>
      ) : chartData ? (
        <DonutChartTemplate
          chartData={chartData}
          title="Institution Report Statistics"
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default InstitutionStatistic;

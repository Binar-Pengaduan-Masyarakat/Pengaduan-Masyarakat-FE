import React, { useState, useCallback } from "react";
import useChartData from "../../../hooks/useChartData";
import TemplatePieChart from "./templates/templatePieChart";

const InstitutionStatistic = () => {
  const [userId, setUserId] = useState("");
  const [url, setUrl] = useState("");
  const { chartData, loading, error } = useChartData(url);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setUrl(`http://localhost:3000/api/chart/user/institution/${userId}`);
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
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : chartData ? (
        <TemplatePieChart chartData={chartData} title="Report Summaries" />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default InstitutionStatistic;

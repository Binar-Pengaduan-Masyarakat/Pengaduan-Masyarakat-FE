import React, { useState, useEffect } from "react";
import UseChartData from "./hooks/UseChartData";
import DonutChartTemplate from "./templates/DonutChartTemplate";

const UserCategory = () => {
  const { chartData, loading, error } = UseChartData(
    `${import.meta.env.VITE_BACKEND_URL}/api/charts/institutions/categories`
  );

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <div className="text-danger">Error: {error.message}</div>;

  return (
    chartData && (
      <DonutChartTemplate
        chartData={chartData}
        title="User Category Distribution"
        key={windowSize}
      />
    )
  );
};

export default UserCategory;
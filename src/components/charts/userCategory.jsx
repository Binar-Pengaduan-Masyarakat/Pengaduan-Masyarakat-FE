import React, { useState, useEffect } from "react";
import useChartData from "../../hooks/useChartData";
import TemplateDonutChart from "./templates/templateDonutChart";

const UserCategory = () => {
  const { chartData, loading, error } = useChartData(
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
      <TemplateDonutChart
        chartData={chartData}
        title="User Category Distribution"
        key={windowSize}
      />
    )
  );
};

export default UserCategory;

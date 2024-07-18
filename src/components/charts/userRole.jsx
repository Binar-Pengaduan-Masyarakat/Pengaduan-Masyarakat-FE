import React, { useState, useEffect } from "react";
import useChartData from "../../hooks/useChartData";
import TemplateDonutChart from "./templates/templateDonutChart";

const UserRoleChart = () => {
  const { chartData, loading, error } = useChartData(
    `${import.meta.env.VITE_BACKEND_URL}/api/charts/users/roles`
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
        title="User Roles Distribution"
        key={windowSize}
      />
    )
  );
};

export default UserRoleChart;

import React from "react";
import useChartData from "../../../hooks/useChartData";
import TemplatePieChart from "./templates/templatePieChart";

const UserCategory = () => {
  const { chartData, loading, error } = useChartData(
    "http://localhost:3000/api/chart/user/category"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    chartData && (
      <TemplatePieChart
        chartData={chartData}
        title="User Category Distribution"
      />
    )
  );
};

export default UserCategory;

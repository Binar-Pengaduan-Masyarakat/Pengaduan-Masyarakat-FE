import React from "react";
import useChartData from "../../hooks/useChartData";
import TemplatePieChart from "./templates/templatePieChart";

const UserRoleChart = () => {
  const { chartData, loading, error } = useChartData(
    `${import.meta.env.VITE_BACKEND_URL}/api/charts/users/roles`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    chartData && (
      <TemplatePieChart chartData={chartData} title="User Roles Distribution" />
    )
  );
};

export default UserRoleChart;

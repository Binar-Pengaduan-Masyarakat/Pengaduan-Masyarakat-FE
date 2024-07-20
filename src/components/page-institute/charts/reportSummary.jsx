import React from "react";
import useChartData from "../../../hooks/useChartData";
import TemplatePieChart from "./templates/templatePieChart";

const ReportSummary = () => {
  const { chartData, loading, error } = useChartData(
    `${import.meta.env.VITE_BACKEND_URL}/api/charts/reports/stats`
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
        title="Report Summaries"
        key={windowSize}
      />
    )
  );
};

export default ReportSummary;

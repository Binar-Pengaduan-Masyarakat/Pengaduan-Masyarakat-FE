import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Title, Tooltip, ChartDataLabels);

const DonutChartTemplate = ({ chartData, title }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 18 },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          const initials = label
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
          return initials;
        },
        font: { size: 12 },
        color: "white",
      },
    },
    layout: {
      padding: 20,
    },
  };

  const colorRange = ["#2E4053", "#456778", "#6495ED", "#87A7B1"];

  const modifiedChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.data.map(
        (_, dataIndex) => colorRange[dataIndex % colorRange.length]
      ),
      borderColor: "white",
      borderWidth: 1,
    })),
  };

  return (
    <div className="chart-container">
      <Doughnut data={modifiedChartData} options={options} />
    </div>
  );
};

DonutChartTemplate.propTypes = {
  chartData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        backgroundColor: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default DonutChartTemplate;

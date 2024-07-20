import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Title, Tooltip, ChartDataLabels);

const PieChartTemplate = ({ chartData, title }) => {
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

  const reddishColors = ["#ff3333", "#ff9999"];

  const modifiedChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.data.map(
        (_, dataIndex) => reddishColors[dataIndex % reddishColors.length]
      ),
      borderColor: "white",
      borderWidth: 1,
    })),
  };

  return (
    <div className="chart-container">
      <Pie data={modifiedChartData} options={options} />
    </div>
  );
};

PieChartTemplate.propTypes = {
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

export default PieChartTemplate;

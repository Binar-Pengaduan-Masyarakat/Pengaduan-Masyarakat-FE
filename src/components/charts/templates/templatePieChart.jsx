import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Legend, Tooltip } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Title, Legend, Tooltip);

const TemplatePieChart = ({ chartData, title }) => {
  const totalValue = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, index) => {
              const value = datasets[0].data[index];
              const percentage = ((value / totalValue) * 100).toFixed(2);
              return {
                text: `${label}: ${value} (${percentage}%)`,
                fillStyle: datasets[0].backgroundColor[index],
                hidden: !chart.getDataVisibility(index),
                index: index,
              };
            });
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: { size: 18 },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

TemplatePieChart.propTypes = {
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

export default TemplatePieChart;

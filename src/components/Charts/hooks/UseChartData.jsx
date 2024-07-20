import { useState, useEffect } from "react";

const GenerateColor = (index) =>
  `hsla(${(index * 137.5) % 360}, 70%, 50%, 0.6)`;

const UseChartData = (url) => {
  const [state, setState] = useState({
    chartData: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(({ data: { labels, data } }) => {
        setState({
          chartData: {
            labels,
            datasets: [
              {
                data: data.map(Number),
                backgroundColor: data.map((_, i) => GenerateColor(i)),
                borderColor: data.map((_, i) =>
                  GenerateColor(i).replace("0.6", "1")
                ),
                borderWidth: 1,
              },
            ],
          },
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setState({ chartData: null, loading: false, error });
      });
  }, [url]);

  return state;
};

export default UseChartData;

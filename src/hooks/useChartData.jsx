import { useState, useEffect } from "react";
import axios from "axios";

const generateColor = (index) =>
  `hsla(${(index * 137.5) % 360}, 70%, 50%, 0.6)`;

const useChartData = (url) => {
  const [state, setState] = useState({
    chartData: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    axios
      .get(url)
      .then(
        ({
          data: {
            data: { labels, data },
          },
        }) => {
          setState({
            chartData: {
              labels,
              datasets: [
                {
                  data: data.map(Number),
                  backgroundColor: data.map((_, i) => generateColor(i)),
                  borderColor: data.map((_, i) =>
                    generateColor(i).replace("0.6", "1")
                  ),
                  borderWidth: 1,
                },
              ],
            },
            loading: false,
            error: null,
          });
        }
      )
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setState({ chartData: null, loading: false, error });
      });
  }, [url]);

  return state;
};

export default useChartData;

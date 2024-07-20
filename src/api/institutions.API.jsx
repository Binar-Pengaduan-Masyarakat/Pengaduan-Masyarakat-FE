import { useState, useEffect } from "react";

export default function useFetchInstitutions() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://159.223.57.46:3000/api/institutions`);
        const fetchedData = await response.json();
        setData(fetchedData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, error, isLoading };
}

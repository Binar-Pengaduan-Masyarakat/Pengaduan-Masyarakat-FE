import { useState, useEffect } from "react";

export default function useFetchInstitutions() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
    const URL = import.meta.env.VITE_BACKEND_URL
      try {
        const response = await fetch(`${URL}/api/institutions`);
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

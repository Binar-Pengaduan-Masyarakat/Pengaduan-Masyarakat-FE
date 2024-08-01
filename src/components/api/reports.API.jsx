/** @format */

import { useState, useEffect, useCallback } from "react";

export default function useFetchReports() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const response = await fetch(`${URL}/api/reports`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteReport = useCallback(async (reportId) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${URL}/api/reports/${reportId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the report");
      }
      alert("Report deleted successfully");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return { data, error, isLoading, deleteReport };
}

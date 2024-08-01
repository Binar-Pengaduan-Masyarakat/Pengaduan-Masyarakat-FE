/** @format */

import { useState, useEffect, useCallback } from "react";

export default function useFetchInstitutions() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const response = await fetch(`${URL}/api/institutions`);
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

  const deleteInstitution = useCallback(async (institutionId) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${URL}/api/institutions/${institutionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the institution");
      }
      alert("Institution deleted successfully");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return { data, error, isLoading, deleteInstitution };
}

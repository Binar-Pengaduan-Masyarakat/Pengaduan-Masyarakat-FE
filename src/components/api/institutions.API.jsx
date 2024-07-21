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

  const deleteInstitution = async (institutionId) => {
    const URL = import.meta.env.VITE_BACKEND_URL
    try {
      const response = await fetch(`${URL}/api/institutions/${institutionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the institution');
      }
      // Optionally, you can re-fetch the data or update state here
      // to reflect the deletion in your UI
      alert('Institution deleted successfully');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return { data, error, isLoading, deleteInstitution };
}

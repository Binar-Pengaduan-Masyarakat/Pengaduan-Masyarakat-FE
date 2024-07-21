import { useState, useEffect } from "react";

export function useFetchReports() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://159.223.57.46:3000/api/reports`);
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

export function useFetchReportById(reportId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://159.223.57.46:3000/api/reports/${reportId}`
        );
        const fetchedData = await response.json();
        setData(fetchedData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [reportId]); // Tambahkan reportId sebagai dependency agar useEffect berjalan ulang ketika reportId berubah

  return { data, error, isLoading };
}

// ngambil data untuk berdasarkan type
async function fetchByType(type) {
  try {
    const response = await fetch(`http://159.223.57.46:3000/api/${type}`);
    const fetchedData = await response.json();
    return fetchedData;
  } catch (err) {
    throw new Error(err.message);
  }
}

export function useCombineData() {
  const [dataGabungan, setDataGabungan] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data reports dan categories sekali saja
        const [reportData, categoriesData] = await Promise.all([
          fetchByType("reports"),
          fetchByType("categories"),
        ]);

        const dataGabungan = {
          reports: reportData,
          categories: categoriesData,
        };

        setDataGabungan(dataGabungan);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data: dataGabungan, error, isLoading };
}

export const postData = async (data) => {
  try {
    const response = await fetch("http://159.223.57.46:3000/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting data:", error.message);
    throw error;
  }
};

const useReports = {
  useFetchReports,
  useFetchReportById,
  useCombineData,
  postData,
};

export default useReports;

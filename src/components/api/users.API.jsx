/** @format */

import { useState, useEffect, useCallback } from "react";
import useFetchReports from "./repots.API";

export default function useFetchUsers() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getdataReports = useFetchReports();
  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = useCallback(async () => {
    if (!getdataReports.data || !getdataReports.data.data) return;

    const reports = getdataReports.data.data;
    const userIds = [...new Set(reports.map((report) => report.userId))];

    try {
      const responses = await Promise.all(
        userIds.map((userId) => fetch(`${URL}/api/users/${userId}`))
      );
      const usersData = await Promise.all(responses.map((res) => res.json()));

      const combinedData = reports.map((report) => ({
        ...report,
        user: usersData.find((user) => user.data.userId === report.userId),
      }));

      setData(combinedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [getdataReports.data, URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { data, error, isLoading };
}

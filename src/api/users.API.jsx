import { useState, useEffect } from "react";
import useFetchReports from "./repots.API";

export default function useFetchUsers() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const getdataReports = useFetchReports();

    useEffect(() => {
        async function fetchData() {
            if (!getdataReports.data || !getdataReports.data.data) return;

            const reports = getdataReports.data.data;
            const userIds = [...new Set(reports.map(report => report.userId))];
            
            try {
                const responses = await Promise.all(userIds.map(userId => fetch(`http://159.223.57.46:3000/api/users/${userId}`)));
                const usersData = await Promise.all(responses.map(res => res.json()));

                const combinedData = reports.map(report => ({
                    ...report,
                    user: usersData.find(user => user.data.userId === report.userId)
                }));

                setData(combinedData);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [getdataReports.data]);

    return { data, error, isLoading };
}

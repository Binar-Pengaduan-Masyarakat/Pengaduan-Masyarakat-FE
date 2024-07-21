import { useState, useEffect } from "react";
import axios from "axios";
import useFetchReports from "../api/repots.API";
import { format } from "date-fns";
import "../css/page-institute/admin.css";

const DashboardSuperAdmin = () => {
  const {
    data: reportsData,
    error: reportsError,
    isLoading: reportsLoading,
  } = useFetchReports();
  const [stats, setStats] = useState({ labels: [], data: [] });
  const [statsError, setStatsError] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/charts/reports/stats`
        );
        setStats(response.data.data);
      } catch (err) {
        setStatsError(err.message);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (reportsLoading || statsLoading) return <p>Memuat...</p>;
  if (reportsError || statsError)
    return <p>Error: {reportsError || statsError}</p>;

  const [totalReports, respondedReports, finishedReports] = stats.data;

  return (
    <div className="dashboard-content">
      <h1>
        Super Admin Dashboard <i className="bi bi-person-gear"></i>
      </h1>
      <div className="stats-overview">
        <div className="stat-box">
          <div className="stat-number">{totalReports}</div>
          <div className="stat-label">
            Jumlah Laporan <i className="bi bi-file-earmark-text"></i>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{respondedReports}</div>
          <div className="stat-label">
            Laporan Selesai <i className="bi bi-file-earmark-check"></i>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{finishedReports}</div>
          <div className="stat-label">
            Laporan Belum Selesai <i className="bi bi-file-earmark-x"></i>
          </div>
        </div>
      </div>
      <div className="latest-reports">
        <h2>Aduan Terbaru</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Pelapor</th>
              <th scope="col">Laporan</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.data.map((report) => {
              return (
                <tr key={report.reportId}>
                  <td>{report.reportId}</td>
                  <td>{report.userId}</td>
                  <td>{report.reportContent}</td>
                  <td>{format(new Date(report.createdAt), "PPpp")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSuperAdmin;

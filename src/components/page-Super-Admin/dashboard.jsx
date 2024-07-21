import useFetchReports from "../api/repots.API";
import "../css/page-institute/admin.css"

const DashboardSuperAdmin = () => {
  const { data, error, isLoading } = useFetchReports();
  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>
      <div className="stats-overview">
        <div className="stat-box">
          <div className="stat-number">{data.data.length}</div>
          <div className="stat-label">Jumlah Laporan</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">3</div>
          <div className="stat-label">Laporan Selesai</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">3</div>
          <div className="stat-label">Laporan Belum Selesai</div>
        </div>
      </div>
      <div className="latest-reports">
        <h2>Aduan Terbaru</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No. Laporan</th>
              <th scope="col">Pelapor</th>
              <th scope="col">Laporan</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((report) => (
              <tr key={report.reportId}>
                <td>{report.reportId}</td>
                <td>{report.reportContent}</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSuperAdmin;
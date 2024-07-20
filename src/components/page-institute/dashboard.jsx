import useFetchReports from "../../api/repots.API";
import "../../css/page-institute/admin.css"
import AdminNavbar from "./Navbar";
import AdminSidebar from "./Sidebar";

const DashboardInstitute = () => {
  const { data, error, isLoading } = useFetchReports();
  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="main-content">
        <AdminNavbar />
        <div className="dashboard-content">
          <h1>Dashboard</h1>
          <div className="stats-overview">
            <div className="stat-box">
              <div className="stat-number">69</div>
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((report) => (
                  <tr key={report.reportId}>
                    <td>{report.reportId}</td>
                    <td>{report.reportContent}</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInstitute;
import "../../css/page-institute/admin.css"
import AdminNavbar from "./Navbar";
import SuperAdmin from "./Sidebar";

const DashboardSuperAdmin = () => {
    return (
        <div className="admin-dashboard">
          <SuperAdmin />
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
                <table>
                  <thead>
                    <tr>
                      <th>No Laporan</th>
                      <th>Pelapor</th>
                      <th>Laporan</th>
                      <th>Status</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Add report rows here */}
                  </tbody>
                </table>
              </div>
              <div className="report-summary">
                <h2>Jumlah Laporan Saat Ini</h2>
                <div className="summary-number">59</div>
                <div className="summary-details">
                  <div className="detail-box">
                    <div className="detail-number">130</div>
                    <div className="detail-label">Laporan Status Selesai</div>
                  </div>
                  <div className="detail-box">
                    <div className="detail-number">54</div>
                    <div className="detail-label">Laporan Status Belum Selesai</div>
                  </div>
                  <div className="detail-box">
                    <div className="detail-number">576</div>
                    <div className="detail-label">Laporan Indikasi Palsu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default DashboardSuperAdmin;
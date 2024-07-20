import "../../../css/page-institute/admin.css"
import AdminNavbar from "../Navbar";
import SuperAdmin from "../Sidebar";

const ManagementUser = () => {
    return (
        <div className="admin-dashboard">
          <SuperAdmin />
          <div className="main-content">
            <AdminNavbar />
            <div className="dashboard-content">
              <div className="latest-reports">
                <h2>MANAGEMENT USERS</h2>
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
            </div>
          </div>
        </div>
      );
};

export default ManagementUser;
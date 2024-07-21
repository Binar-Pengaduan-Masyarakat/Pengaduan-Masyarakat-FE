import useFetchUsers from "../../../api/users.API";
import "../../../css/page-institute/admin.css";
import AdminNavbar from "../Navbar";
import AdminSidebar from "../Sidebar";

const ManagementReports = () => {
  const { data, error, isLoading } = useFetchUsers();
  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <div className="latest-reports">
        <h2>MANAGEMENT REPORTS</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>No Laporan</th>
              <th>Tanggal Laporan</th>
              <th>Pelapor</th>
              <th>Laporan</th>
              <th>Gambar</th>
              <th>Tanggal Respond</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((report, index) => (
              <tr key={report.reportId}>
                <td>{index + 1}</td>
                <td>{report.reportId}</td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td>{report.user ? report.user.data.name : 'Unknown'}</td>
                <td>{report.reportContent}</td>
                <td>{report.reportImage ? <img src={report.reportImage} alt="Report" width="50" /> : 'No Image'}</td>
                <td>{/* Add Tanggal Respond if available */}</td>
                <td>
                  <button>Response</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagementReports;

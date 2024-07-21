import useFetchReports from "../../api/repots.API";
import "../../css/page-institute/admin.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const MasterDataAduan = () => {
  const { data, error, isLoading, deleteReport } = useFetchReports();

  if (!isLoading && !error && data) {
    console.log("Fetched Data:", data);
  }

  const handleDelete = (reportId) => {
    deleteReport(reportId);
  };

  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <div className="latest-reports">
        <h2>MASTER DATA ADUAN</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID Laporan</th>
              <th scope="col">Pelapor</th>
              <th scope="col">Content</th>
              <th scope="col">Address</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((report) => (
              <tr key={report.reportId}>
                <td>{report.reportId}</td>
                <td>{report.userId}</td>
                <td>{report.reportContent}</td>
                <td>{report.address}</td>
                <td>{formatDate(report.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleDelete(report.reportId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterDataAduan;

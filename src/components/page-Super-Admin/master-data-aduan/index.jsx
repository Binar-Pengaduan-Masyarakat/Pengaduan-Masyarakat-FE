import useFetchReports from "../../../api/repots.API";
// import "../../../css/page-institute/admin.css"
import AdminNavbar from "../Navbar";
import SuperAdmin from "../Sidebar";

const MasterDataAduan = () => {
    const { data, error, isLoading } = useFetchReports();
    if (isLoading) return <p>Memuat...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="dashboard-content">
            <div className="latest-reports">
                <h2>MASTER DATA ADUAN</h2>
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
    );
};

export default MasterDataAduan;
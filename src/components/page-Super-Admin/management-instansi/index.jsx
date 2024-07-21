import useFetchInstitutions from "../../../api/institutions.API";
import "../../../css/page-institute/admin.css"
import AdminNavbar from "../Navbar";
import SuperAdmin from "../Sidebar";

const ManagementInstansi = () => {
    const { data, error, isLoading } = useFetchInstitutions();
    if (isLoading) return <p>Memuat...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="dashboard-content">
            <div className="latest-reports">
                <h2>MANAGEMENT ADMIN</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Privilages</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((instansi, index) => (
                            <tr key={instansi.userId}>
                                <td>{index + 1}</td>
                                <td>{instansi.name}</td>
                                <td>{instansi.email}</td>
                                <td>{instansi.roles}</td>
                                <td>{instansi.status ? "Active" : "Inactive"}</td>
                                <td>
                                    <button className="btn btn-success">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagementInstansi;
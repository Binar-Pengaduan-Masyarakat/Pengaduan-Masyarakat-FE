import React, { useState } from "react";
import useFetchInstitutions from "../../api/institutions.API";
import AdminNavbar from "../Navbar";
import SuperAdmin from "../Sidebar";
import AssignRoleModal from "../../Modal/AssignCategoryModal";
// import "../../../css/page-institute/admin.css";

const ManagementInstansi = () => {
  const { data, error, isLoading, deleteInstitution } = useFetchInstitutions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (institutionId) => {
    deleteInstitution(institutionId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ display: "none" }}
      >
        <h2>MANAGEMENT ADMIN</h2>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          Assign Role
        </button>
      </div>
      <table className="table">
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
                <button
                  className="btn btn-success"
                  onClick={() => handleDelete(instansi.userId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AssignRoleModal
          onClose={handleCloseModal}
          onRoleAssigned={() => {
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default ManagementInstansi;

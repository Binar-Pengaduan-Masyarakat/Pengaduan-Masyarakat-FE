import React, { useState } from "react";
import useFetchInstitutions from "../../api/institutions.API";
import CreateCategoryModal from "../../Modal/CreateCategoryModal";
import "../../css/page-institute/admin.css";

const ManagementInstansi = () => {
  const { data, error, isLoading, deleteInstitution } = useFetchInstitutions();
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);

  const handleDelete = (institutionId) => {
    deleteInstitution(institutionId);
  };

  const handleOpenCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(false);
  };

  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <div className="manage-admin d-flex justify-content-between align-items-center">
        <h2>MANAGEMENT ADMIN</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={handleOpenCreateCategoryModal}
          >
            Create Category
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
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
      </div>

      {isCreateCategoryModalOpen && (
        <CreateCategoryModal
          isOpen={isCreateCategoryModalOpen}
          onClose={handleCloseCreateCategoryModal}
        />
      )}
    </div>
  );
};

export default ManagementInstansi;

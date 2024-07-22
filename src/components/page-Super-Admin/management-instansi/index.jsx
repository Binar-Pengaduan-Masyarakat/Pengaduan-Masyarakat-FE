import React, { useState } from "react";
import useFetchInstitutions from "../../api/institutions.API";
import AssignRoleModal from "../../Modal/AssignCategoryModal";
import CreateInstitutionModal from "./modal";
import UpdateRoleModal from "../../Modal/UpdateRoleModal";
import "../../css/page-institute/admin.css";

const ManagementInstansi = () => {
  const { data, error, isLoading, deleteInstitution, createInstitution } =
    useFetchInstitutions();
  const [isAssignRoleModalOpen, setIsAssignRoleModalOpen] = useState(false);
  const [isCreateInstitutionModalOpen, setIsCreateInstitutionModalOpen] =
    useState(false);
  const [isUpdateRoleModalOpen, setIsUpdateRoleModalOpen] = useState(false);

  const handleDelete = (institutionId) => {
    deleteInstitution(institutionId);
  };

  const handleOpenAssignRoleModal = () => {
    setIsAssignRoleModalOpen(true);
  };

  const handleCloseAssignRoleModal = () => {
    setIsAssignRoleModalOpen(false);
  };

  const handleOpenCreateInstitutionModal = () => {
    setIsCreateInstitutionModalOpen(true);
  };

  const handleCloseCreateInstitutionModal = () => {
    setIsCreateInstitutionModalOpen(false);
  };

  const handleOpenUpdateRoleModal = () => {
    setIsUpdateRoleModalOpen(true);
  };

  const handleCloseUpdateRoleModal = () => {
    setIsUpdateRoleModalOpen(false);
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
            onClick={handleOpenAssignRoleModal}
          >
            Assign Role
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={handleOpenUpdateRoleModal}
          >
            Update Role
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={handleOpenCreateInstitutionModal}
          >
            Create Institution
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
      {isAssignRoleModalOpen && (
        <AssignRoleModal
          onClose={handleCloseAssignRoleModal}
          onRoleAssigned={handleCloseAssignRoleModal}
        />
      )}

      {isCreateInstitutionModalOpen && (
        <CreateInstitutionModal
          isOpen={isCreateInstitutionModalOpen}
          onClose={handleCloseCreateInstitutionModal}
        />
      )}

      {isUpdateRoleModalOpen && (
        <UpdateRoleModal
          onClose={handleCloseUpdateRoleModal}
          onRoleUpdated={handleCloseUpdateRoleModal}
        />
      )}
    </div>
  );
};

export default ManagementInstansi;

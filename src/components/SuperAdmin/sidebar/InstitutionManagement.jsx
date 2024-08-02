/** @format */

import React, { useState, useEffect } from "react";
import useFetchInstitutions from "../../api/institutions.API";
import AssignRoleModal from "../../Modal/AssignCategoryModal";
import CreateInstitutionModal from "../../Modal/CreateInstitutionModal";
import UpdateCategoryModal from "../../Modal/UpdateCategoryModal";
import "/public/css/SuperAdminManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/ReportsTable.css";
import { Container, Button, Table } from "react-bootstrap";
import axios from "axios";

const InstitutionManagement = () => {
  const { data, error, isLoading, deleteInstitution, createInstitution } =
    useFetchInstitutions();
  const [modals, setModals] = useState({
    assignRole: false,
    createInstitution: false,
    updateRole: false,
  });
  const [categories, setCategories] = useState({});

  const handleModalToggle = (modalName, isOpen) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: isOpen,
    }));
  };

  const handleDelete = (institutionId) => {
    deleteInstitution(institutionId);
  };

  useEffect(() => {
    if (data) {
      data.forEach((institution) => {
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/api/categories/user/${
              institution.userId
            }`
          )
          .then((response) => {
            const categoryIds =
              response.data.length > 0
                ? response.data.map((category) => category.categoryId)
                : null;
            setCategories((prevCategories) => ({
              ...prevCategories,
              [institution.userId]: categoryIds,
            }));
          })
          .catch((error) => {
            console.error(
              `Error fetching categories for user ${institution.userId}:`,
              error
            );
          });
      });
    }
  }, [data]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-3">Institution Management</h3>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <Button
            className="me-2"
            variant="primary"
            onClick={() => handleModalToggle("assignRole", true)}>
            Assign Category
          </Button>
          <Button
            className="me-2"
            variant="primary"
            onClick={() => handleModalToggle("updateRole", true)}>
            Update Category
          </Button>
          <Button
            className="me-2"
            variant="primary"
            onClick={() => handleModalToggle("createInstitution", true)}>
            Create Institution
          </Button>
        </div>
      </div>
      <div
        className="table-container"
        style={{
          overflowY: "auto",
          display: "block",
        }}>
        <Table striped bordered hover style={{ tableLayout: "auto" }}>
          <thead className="thead-dark">
            <tr>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                User ID
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Name
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Email
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Category ID
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Created At
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((institution, index) => (
                <tr key={institution.userId || index}>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {institution.userId}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {institution.name || "N/A"}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {institution.email || "N/A"}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {categories[institution.userId] !== null
                      ? categories[institution.userId]
                        ? categories[institution.userId].join(", ")
                        : "Loading..."
                      : "N/A"}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {institution.createdAt}
                  </td>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(institution.userId)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {modals.assignRole && (
        <AssignRoleModal
          onClose={() => handleModalToggle("assignRole", false)}
          onRoleAssigned={() => handleModalToggle("assignRole", false)}
        />
      )}

      {modals.createInstitution && (
        <CreateInstitutionModal
          isOpen={modals.createInstitution}
          onClose={() => handleModalToggle("createInstitution", false)}
        />
      )}

      {modals.updateRole && (
        <UpdateCategoryModal
          onClose={() => handleModalToggle("updateRole", false)}
          onRoleUpdated={() => handleModalToggle("updateRole", false)}
        />
      )}
    </Container>
  );
};

export default InstitutionManagement;

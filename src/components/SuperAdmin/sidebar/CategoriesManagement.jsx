/** @format */

import React, { useState, useEffect, useCallback } from "react";
import CreateCategoryModal from "../../Modal/CreateCategoryModal";
import "/public/css/SuperAdminManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Table } from "react-bootstrap";

const CategoriesManagement = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const categories = await response.json();
      setData(categories);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = useCallback(async (categoryId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      setData((prevData) =>
        prevData.filter((category) => category.categoryId !== categoryId)
      );
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleOpenCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-3">Categories Management</h3>
        <div>
          <Button
            variant="primary"
            onClick={handleOpenCreateCategoryModal}
            className="me-2">
            Create Category
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
                Category ID
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Category Name
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <tr key={category.categoryId}>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {category.categoryId}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {category.categoryName}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(category.categoryId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {isCreateCategoryModalOpen && (
        <CreateCategoryModal
          isOpen={isCreateCategoryModalOpen}
          onClose={handleCloseCreateCategoryModal}
        />
      )}
    </Container>
  );
};

export default CategoriesManagement;

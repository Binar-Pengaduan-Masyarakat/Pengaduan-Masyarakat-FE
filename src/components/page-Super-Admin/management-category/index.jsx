import React, { useState, useEffect } from "react";
import CreateCategoryModal from "../../Modal/CreateCategoryModal";
import "../../css/page-institute/admin.css";

const ManagementInstansi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
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
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
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
      setData(data.filter((category) => category.categoryId !== categoryId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <div className="manage-admin d-flex justify-content-between align-items-center">
        <h2>MANAGEMENT CATEGORY</h2>
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
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category, index) => (
              <tr key={category.categoryId}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleDelete(category.categoryId)}
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

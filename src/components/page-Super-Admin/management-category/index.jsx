import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/page-institute/admin.css";

const useFetchCategories = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/${categoryId}`
      );
      setData(data.filter((category) => category.categoryId !== categoryId));
    } catch (err) {
      setError(err);
    }
  };

  return { data, error, isLoading, deleteCategory };
};

const ManagementCategory = () => {
  const { data, error, isLoading, deleteCategory } = useFetchCategories();

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId);
  };

  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="dashboard-content">
      <div className="latest-reports">
        <h2>MASTER DATA KATEGORI</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID Kategori</th>
                <th scope="col">Nama Kategori</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((category) => (
                <tr key={category.categoryId}>
                  <td>{category.categoryId}</td>
                  <td>{category.categoryName}</td>
                  <td>
                    <button
                      className="btn btn-danger"
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
      </div>
    </div>
  );
};

export default ManagementCategory;

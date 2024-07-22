import React, { useState } from "react";
import "/public/css/CreateReportModal.css";
import "/public/css/Modal.css";

const CreateCategoryModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create category");
      }

      setTimeout(() => {
        setLoading(false);
        alert("Category created successfully");
        onClose();
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error creating category:", error);
      alert(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Category</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body" style={{ marginTop: "-10px" }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="categoryName" style={{ marginBottom: "5px" }}>
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                  />
                </div>
                <div className="submit-container">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    style={{
                      backgroundColor: "#343a40",
                      borderStyle: "none",
                      marginTop: "10px",
                    }}
                  >
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategoryModal;

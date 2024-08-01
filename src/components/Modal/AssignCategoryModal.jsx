/** @format */

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import "/public/css/CreateReportModal.css";
import "/public/css/Modal.css";

const AssignRoleModal = ({ onClose, onRoleAssigned }) => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCategories, setUserCategories] = useState({});
  const { userId } = useContext(UserContext);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      await Promise.all([fetchUsers(), fetchCategories()]);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchUserCategories(selectedUserId);
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/superAdmin/institutions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUserCategories = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user categories");
      }
      const data = await response.json();
      setUserCategories((prev) => ({
        ...prev,
        [userId]: data,
      }));
    } catch (error) {
      console.error("Error fetching user categories:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      userId: selectedUserId,
      categoryId: selectedCategoryId,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/superAdmin/userCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign role");
      }

      setTimeout(() => {
        setLoading(false);
        onRoleAssigned();
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error assigning role:", error);
      setLoading(false);
    }
  };

  const isButtonDisabled = () => {
    if (selectedUserId) {
      const assignedCategories = userCategories[selectedUserId] || [];
      return assignedCategories.length > 0;
    }
    return false;
  };

  const getButtonText = () => {
    if (isButtonDisabled()) {
      return "Category Assigned Already";
    }
    return loading ? "Submitting..." : "Submit";
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign Institution Category</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}></button>
            </div>
            <div className="modal-body" style={{ marginTop: "-10px" }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="userId" style={{ marginBottom: "5px" }}>
                    User
                  </label>
                  <select
                    className="form-control"
                    id="userId"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    required>
                    <option value="">Select Institution</option>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <option key={user.userId} value={user.userId}>
                          {user.name}
                        </option>
                      ))
                    ) : (
                      <option value="">Loading users...</option>
                    )}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="categoryId" style={{ marginBottom: "5px" }}>
                    Category
                  </label>
                  <select
                    className="form-control"
                    id="categoryId"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    required>
                    <option value="">Select Category</option>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}>
                          {category.categoryName}
                        </option>
                      ))
                    ) : (
                      <option value="">Loading categories...</option>
                    )}
                  </select>
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
                    disabled={loading || isButtonDisabled()}>
                    {getButtonText()}
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
export default AssignRoleModal;

/** @format */

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "/public/css/SuperAdminManagement.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/ReportsTable.css";
import { Container, Button, Table } from "react-bootstrap";

const UsersManagement = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${URL}/api/superAdmin/users`);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteUser = useCallback(async (userId) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.delete(`${URL}/api/users/${userId}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete the user");
      }
      setData((prevData) => prevData.filter((user) => user.id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleDelete = useCallback(
    (userId) => {
      deleteUser(userId);
    },
    [deleteUser]
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="my-3">Users Management</h3>
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
                Created At
              </th>
              <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data
                .filter((user) => user.userId.includes("US"))
                .map((user, index) => (
                  <tr key={user.userId || index}>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      {user.userId}
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      {user.name || "N/A"}
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      {user.email || "N/A"}
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      {user.createdAt}
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user.userId)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UsersManagement;

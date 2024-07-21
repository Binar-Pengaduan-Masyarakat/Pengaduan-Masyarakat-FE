import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/page-institute/admin.css";

const ManagementUser = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const response = await axios.get(`${URL}/api/superAdmin/users`);
        console.log(response.data); // Log data yang diterima untuk memastikan struktur data
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    const URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.delete(`${URL}/api/users/${userId}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete the user");
      }
      // Optionally, update state to remove the deleted user from the list
      setData((prevData) => prevData.filter((user) => user.id !== userId));
      alert("User deleted successfully");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-content">
      <div className="latest-reports">
        <h2>MANAGEMENT USERS</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>User id</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data
                  .filter((user) => user.userId.includes("US")) // Filter pengguna dengan id yang mengandung 'US' sebagai contoh
                  .map((user, index) => (
                    <tr key={user.userId || index}>
                      {" "}
                      {/* Pastikan setiap elemen memiliki properti key yang unik */}
                      <td>{index + 1}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.email || "N/A"}</td>
                      <td>{user.userId}</td>{" "}
                      {/* Menampilkan userId sebagai peran sementara */}
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleDelete(user.userId)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5">Tidak ada data pengguna</td>{" "}
                  {/* Update colSpan to 5 */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementUser;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../public/css/userProfile.css";
import { format } from "date-fns";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // State to trigger re-render

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUserData(data.data);
        setNewName(data.data.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [userId, refresh]); // Added refresh as dependency

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }), // Only submit the name
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData.data);
        setIsEditing(false);
        setRefresh((prev) => !prev); // Toggle the refresh state to trigger re-render
      } else {
        throw new Error("Failed to update user name");
      }
    } catch (error) {
      console.error("Error updating user name:", error);
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : format(date, "MMMM dd, yyyy");
  };

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="profile-card">
        <div className="profile-image">
          <img src="/images/placeholder/profile.png" alt="User Profile" />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <h2>{userData ? userData.name : "Loading..."}</h2>
          )}
          <p>{userData ? userData.email : ""}</p>

          <p>
            Joined: {userData ? formatDate(userData.createdAt) : "Loading..."}
          </p>
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit Name</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

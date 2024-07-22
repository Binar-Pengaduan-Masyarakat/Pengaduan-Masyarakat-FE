import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import Dropzone from "react-dropzone";
import { UserContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/css/UserProfile.css";

const Profile = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setUserData(data.data);
        setNewName(data.data.name);

        const imageUrl = data.data.userImage
          ? `${import.meta.env.VITE_BACKEND_URL}/profiles/${
              data.data.userImage
            }`
          : "/images/placeholder/profile.png";
        setProfileImage(imageUrl);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [userId, refresh]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", newName);
    if (profileImage instanceof File) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      setUserData(updatedData.data);
      setIsEditing(false);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setProfileImage(acceptedFiles[0]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserId(null);
    window.location.href = "/";
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
      <div className="card profile-card">
        <div className="card-body">
          <form onSubmit={handleSaveClick} style={{ width: "100%" }}>
            <div className="profile-image">
              <img
                src={
                  profileImage instanceof File
                    ? URL.createObjectURL(profileImage)
                    : profileImage
                }
                alt="User Profile"
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="profile-info">
              {isEditing ? (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <Dropzone
                      onDrop={handleDrop}
                      maxFiles={1}
                      accept="image/*"
                      onDropAccepted={(files) => {
                        const file = files[0];
                        if (file.size > 1048576) {
                          alert("Image size exceeds 1MB limit, Post will fail");
                        } else {
                          setReportImage(file);
                        }
                      }}
                      onDropRejected={() => {
                        alert("Only image files are allowed.");
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
                          <p>
                            Drag 'n' drop a new profile picture, or click to
                            select one (1MB max)
                          </p>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Profile"}
                  </button>
                </>
              ) : (
                <>
                  <h5 className="card-title">
                    {userData ? userData.name : "Loading..."}
                  </h5>
                  <p className="card-text">
                    User ID: {userData ? userData.userId : "Loading..."}
                  </p>
                  <p className="card-text">
                    Email: {userData ? userData.email : "Loading..."}
                  </p>
                  <p className="card-text">
                    Account Created:{" "}
                    {userData ? formatDate(userData.createdAt) : "Loading..."}
                  </p>
                  <div className="button-group">
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={handleEditClick}
                    >
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

/** @format */

import React, { useState, useEffect, useContext } from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import { UserContext } from "./UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import UserProfileModal from "./Modal/UserProfileModal";
import "/public/css/Header.css";
const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser?.id;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId: contextUserId } = useContext(UserContext);
  const [userImage, setUserImage] = useState(
    "/images/placeholder/profile.webp"
  );
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);

  const effectiveUserId = contextUserId || userId;
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserRole(storedUser?.roles || "");
    const fetchUserData = async () => {
      if (!effectiveUserId) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${effectiveUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        const imageUrl = data.data.userImage
          ? `${import.meta.env.VITE_BACKEND_URL}/profiles/${
              data.data.userImage
            }`
          : "/images/placeholder/profile.webp";
        setUserImage(imageUrl);
        setUserName(data.data.name || "");
        setUserRole(data.data.roles || storedUser?.roles || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [effectiveUserId]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const dashboardPaths = [
    "/superadmin/dashboard",
    "/superadmin/institutions",
    "/superadmin/users",
    "/superadmin/reports",
    "/superadmin/categories",
  ];
  const isOnDashboard = dashboardPaths.includes(location.pathname);

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand style={{ color: "#000" }} href="/">
            Pengaduan Masyarakat
          </Navbar.Brand>
          <Nav className="ml-auto d-flex align-items-center">
            {effectiveUserId ? (
              <div className="d-flex align-items-center">
                {userRole === "SUPERADMIN" && !isOnDashboard && (
                  <Button
                    variant="outline-dark"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleNavigation("/superadmin/users")}>
                    Admin Dashboard
                  </Button>
                )}
                {/* {userName && (
                  <span
                    style={{
                      color: "#000",
                      marginRight: "10px",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                    onClick={handleModalToggle}>
                    {userName}
                  </span>
                )} */}
                <Image
                  src={userImage}
                  roundedCircle
                  className="user-image"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    border: "2px solid #fff",
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                  }}
                  onClick={handleModalToggle}
                />
              </div>
            ) : (
              <Button
                variant="outline-dark"
                onClick={() => handleNavigation("/login")}>
                Login / Register
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
      {effectiveUserId && (
        <UserProfileModal show={showModal} onHide={handleModalToggle} />
      )}
    </>
  );
};
export default Header;

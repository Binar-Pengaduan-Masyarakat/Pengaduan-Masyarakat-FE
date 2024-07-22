import React, { useState, useEffect, useContext } from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import { UserContext } from "./UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const storedUser = JSON.parse(localStorage.getItem("user"));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useContext(UserContext);
  const [userImage, setUserImage] = useState(
    "/images/placeholder/profile.webp"
  );
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(storedUser?.roles || "");

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
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
    }
  }, [userId]);

  const handleProfileClick = () => {
    navigate(`/users/${userId}`);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleDashboardClick = () => {
    navigate("/superadmin/dashboard");
  };

  const dashboardPaths = [
    "/superadmin/dashboard",
    "/superadmin/instansiManagement",
    "/superadmin/managementusers",
    "/superadmin/reports",
    "/superadmin/managementcat",
  ];
  const isOnDashboard = dashboardPaths.includes(location.pathname);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand style={{ color: "#000" }} href="/">
          Pengaduan Masyarakat
        </Navbar.Brand>
        <Nav className="ml-auto d-flex align-items-center">
          {userId ? (
            <div className="d-flex align-items-center">
              {userRole === "SUPERADMIN" && !isOnDashboard && (
                <Button
                  variant="outline-dark"
                  style={{ marginRight: "10px" }}
                  onClick={handleDashboardClick}
                >
                  Admin Dashboard
                </Button>
              )}
              {userName && (
                <span
                  style={{
                    color: "#000",
                    marginRight: "10px",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  onClick={handleProfileClick}
                >
                  {userName}
                </span>
              )}
              <Image
                src={userImage}
                roundedCircle
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  border: "2px solid #fff",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                }}
                onClick={handleProfileClick}
              />
            </div>
          ) : (
            <Button variant="outline-dark" onClick={handleLoginClick}>
              Login / Register
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

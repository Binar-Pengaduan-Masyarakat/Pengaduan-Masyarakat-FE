import React, { useContext } from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const handleProfileClick = () => {
    navigate(`/users/${userId}`);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="dark" style={{ backgroundColor: "#343a40" }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "#fff" }}>
          Pengaduan Masyarakat
        </Navbar.Brand>
        <Nav className="ml-auto">
          {userId ? (
            <Image
              src="/images/placeholder/profile.webp"
              roundedCircle
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={handleProfileClick}
            />
          ) : (
            <Button variant="outline-light" onClick={handleLoginClick}>
              Login / Register
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

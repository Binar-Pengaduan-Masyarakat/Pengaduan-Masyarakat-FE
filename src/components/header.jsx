import React, { useContext } from "react";

import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const handleProfileClick = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <Navbar bg="dark" style={{ backgroundColor: "#343a40" }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "#fff" }}>
          Pengaduan Masyarakat
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Image
            src="/images/placeholder/profile.webp"
            roundedCircle
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={handleProfileClick}
          />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

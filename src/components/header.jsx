import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userId = "US1";

  const handleProfileClick = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Pengaduan Masyarakat</Navbar.Brand>
        <Nav className="ml-auto">
          <Image
            src="/images/placeholder/profile.png"
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

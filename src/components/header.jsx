import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Pengaduan Masyarakat</Navbar.Brand>
        <Nav className="ml-auto">
          <Image
            src="/images/placeholder/profile.png"
            roundedCircle
            style={{ width: "40px", height: "40px" }}
          />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

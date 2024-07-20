import React, { useContext } from "react";
import "../../public/css/navbar.css";
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
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/" style={{ color: "#fff" }} className="navbar-brand">
          Pengaduan Masyarakat
        </Navbar.Brand>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 container-section">
          <li className="nav-item">
            <a className="nav-link section" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link section" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link section" href="#">module</a>
          </li>
          <li className="nav-item">
            <a className="nav-link section" href="#">module2</a>
          </li>
        </ul>
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

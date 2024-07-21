import { useEffect, useState } from "react";
import "../../css/page-user/navbar.css";
import logo from "../../assets/logo/logowhite.png";
import logohitam from "../../assets/logo/logo.png";
import userimg from "../../assets/image/profile.jpeg";
import { Link, useNavigate } from "react-router-dom";
import CreateReportModal from "../CreateReportModal";

const Navbar = () => {
  const [image, setimage] = useState(logo);
  const [userName, setUserName] = useState("");
  const [userRoles, setUserRoles] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add("scrolled");
          setimage(logohitam);
        } else {
          navbar.classList.remove("scrolled");
          setimage(logo);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
      setUserRoles(user.roles);
      setUserId(user.id);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="container-fluid navbar navbar-expand-lg fixed-top">
        <div className="container-sm">
          <Link to="/user">
            <h1 className="navbar-brand">
              <img src={image} alt="LOGO"></img>
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="container-fluid navbar-nav gap-3">
              <li className="nav-item">
                <Link to="/user/about" className="linkcolor">
                  TENTANG WEBSITE!
                </Link>
              </li>
              <li className="nav-item">
                <span className="linkcolor" onClick={openModal}>
                  MASUKKAN ADUAN
                </span>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item dropdown">
                <a
                  className="nav-link custom-user"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <p className="name-user">
                    {userId} - {userName} - {userRoles}
                  </p>
                  <img src={userimg} alt="user" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/user/profil">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      LogOut
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showModal && (
        <CreateReportModal onClose={closeModal} onReportCreated={closeModal} />
      )}
    </>
  );
};

export default Navbar;

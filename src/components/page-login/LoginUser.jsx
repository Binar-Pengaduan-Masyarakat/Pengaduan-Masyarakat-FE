import { Link } from "react-router-dom";
import "../../css/page-login/loginuser.css";
import loginuserimg from "../../assets/image/loginuser.png";
import { handleLogin } from "./auth";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password, navigate);
    setErrorMessage("Email atau Password Salah ");
  };
  return (
    <div className="loginuser_cont">
      <span></span>
      <div className="loginuser_content">
        <div className="form_head">
          <img src={loginuserimg} alt="Gambar" />
        </div>
        <div className="form_conte">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              ></input>
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
            <div className="btn_group">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              <Link to="/reg" className="btn btn-primary">
                Register
              </Link>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;

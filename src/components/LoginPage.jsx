import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      const errorMessage = err.response?.data?.error;
      setError(errorMessage);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h2
              className="card-title text-center"
              style={{ marginBottom: "10px" }}
            >
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#343a40", borderStyle: "none" }}
                >
                  Login
                </button>
              </div>
              <p className="text-center" style={{ marginTop: "20px" }}>
                Don't have an account?{" "}
                <Link to="/register" className="register-link">
                  Click Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

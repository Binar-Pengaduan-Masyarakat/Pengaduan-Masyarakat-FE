import "../../css/page-login/loginuser.css";
import loginuserimg from "../../assets/image/loginuser.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';


const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = import.meta.env.VITE_BACKEND_URL
    try {
      const response = await axios.post(`${URL}/api/auth/login`, formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
 
      if (user.roles === 'USER') {
        navigate('/user');
      } else if (user.roles === 'SUPERADMIN') {
        navigate('/superadmin/dashboard');
      } else if (user.roles === 'INSTITUTION') {
        navigate('/admin/dashboard');
      }

    } catch (err) {
      const errorMessage = err.response?.data?.error;
      setError(errorMessage);
    }
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
                name="email"
                aria-describedby="emailHelp"
                onChange={handleInput}
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
                name="password"
                onChange={handleInput}
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
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;

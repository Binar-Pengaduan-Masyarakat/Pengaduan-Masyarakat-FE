/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <div>
        <h2>Email Verification Successful!</h2>
        <p>You will be redirected to the Homepage in {countdown} seconds.</p>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;

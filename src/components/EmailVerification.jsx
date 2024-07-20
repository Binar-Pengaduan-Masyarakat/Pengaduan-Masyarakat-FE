import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card" style={{ maxWidth: "50vw", padding: "20px" }}>
        <h2 className="text-center">Email Verification</h2>
        <p className="text-center">
          Thank you for registering! Please check your email for a verification
          link.
        </p>
        <p className="text-center">
          If you haven't received the email, please check your spam folder or
          try again.
        </p>
        <p className="text-center">
          You will be redirected to the home page in {countdown} seconds.
        </p>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
            style={{ marginTop: "20px" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

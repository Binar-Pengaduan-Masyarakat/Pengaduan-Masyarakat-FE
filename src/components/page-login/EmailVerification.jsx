import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 30000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <p>User registered. Check your email for verification link.</p>
    </div>
  );
};

export default EmailVerification;

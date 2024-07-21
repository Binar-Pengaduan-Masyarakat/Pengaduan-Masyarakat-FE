import "../css/page-institute/admin.css"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const AdminNavbar = () => {
  const [userRoles, setUserRoles] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRoles(user.roles);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <div className="admin-navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-user">
        <button onClick={handleLogout}>Logout</button>
        <span>{userRoles}</span>
      </div>
    </div>
  );
};

export default AdminNavbar;

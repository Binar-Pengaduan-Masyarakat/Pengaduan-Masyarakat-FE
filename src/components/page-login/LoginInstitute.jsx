const LoginInstitute = ({ onLogin }) => {
  
  const handleLogin = () => {
    // Lakukan proses login untuk User
    // Contoh sederhana untuk simulasi login
    onLogin("user");
  };
  return (
    <div className="logininstitut_cont">
      <h1>Login institute</h1>
      <button onClick={handleLogin}></button>
    </div>
  );
};

export default LoginInstitute;

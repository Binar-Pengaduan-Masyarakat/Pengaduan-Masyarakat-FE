const handleLogin = (email, password, navigate) => {
  // Simulasi validasi login (ganti dengan validasi database Anda)
  if (email === "ode@gmail.com" && password === "123") {
    localStorage.setItem("isLoggedIn", true);
    navigate("/user"); // Navigasi ke halaman dashboard
  } else {
    // Login gagal
    console.error("Email atau password salah."); // Tampilkan pesan error
  }
};

const handleLogout = (navigate) => {
  localStorage.removeItem("isLoggedIn");
  navigate("/"); // Kembali ke halaman login
};

export { handleLogin, handleLogout };

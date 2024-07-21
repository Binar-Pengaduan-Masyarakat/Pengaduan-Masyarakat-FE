// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/users/:id" element={<UserProfile />} />
//         <Route path="/" element={<HomePage />} />
//       </Routes>
//     </Router>
//   );
// }

// function HomePage() {
//   const [data, setData] = useState(null);

//   const fetchAPI = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/users/${id}`); // Sesuaikan URL backend Anda
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAPI();
//   }, []);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Welcome to the User Profile App</h1>
//       <p>Navigate to a user profile by changing the URL to /users/{'{userId}'}</p>
//       {data && (
//         <div>
//           <h2>Data fetched from API:</h2>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

export default App;

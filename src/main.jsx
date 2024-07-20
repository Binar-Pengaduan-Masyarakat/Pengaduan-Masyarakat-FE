import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
<<<<<<< HEAD
import { UserProvider } from "./components/userContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
=======
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
>>>>>>> fe-reports
  </React.StrictMode>
);

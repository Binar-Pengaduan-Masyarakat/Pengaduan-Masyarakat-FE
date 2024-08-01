/** @format */

import { createContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const initializeUser = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUserId(storedUser.id);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);
  return (
    <UserContext.Provider
      value={{ userId, setUserId, token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

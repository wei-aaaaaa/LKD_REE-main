// src/contexts/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://localhost:7148/api/LoginJWT/get-current-user",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              //   Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userData = await response.json();
        if (response.ok) {
          setUser(userData);
        } else {
          throw new Error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

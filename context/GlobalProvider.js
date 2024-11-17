import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext(); // Create a context
export const useGlobalContext = () => useContext(GlobalContext); // Create a custom hook

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Create a state for the login status
  const [user, setUser] = useState(null); // Create a state for the user
  const [isLoading, setIsLoading] = useState(false); // Create a state for the loading status

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

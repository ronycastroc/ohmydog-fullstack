import { createContext, useState } from "react";

const UserContext = createContext();
export default UserContext;

export const UserProvider = ({ children }) => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <UserContext.Provider value={{ showLogout, setShowLogout }}>
      {children}
    </UserContext.Provider>
  );
};


import { createContext, useContext, useState } from "react";

export const RoleContext = createContext<{
  role: any;
  setRole: (role: any) => void;
}>({
  role: null,
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState([]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);

import { createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (prop: any) => {},
});
function AuthProvider({ children }: any) {
  const [isAuthenticated, setAuth] = useState(false);
  function setIsAuthenticated(prop: any) {
    setAuth(prop);
  }
  const value = { isAuthenticated, setIsAuthenticated };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };

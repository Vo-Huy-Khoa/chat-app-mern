import { createContext, useState } from "react";

const AuthContext = createContext({
  auth: false,
  handleAuth: (prop: any) => {},
});
function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState(false);
  function handleAuth(prop: any) {
    setAuth(prop);
  }
  const value = { auth, handleAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };

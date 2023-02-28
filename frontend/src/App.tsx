import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Dashboard } from "./layouts";
import { AuthContext } from "./providers";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="/auth/*"
        element={auth && <Navigate to="/dashboard/home" replace />}
      />
      <Route
        path="*"
        element={!auth && <Navigate to="/auth/sign-in" replace />}
      />
    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Auth, Dashboard } from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

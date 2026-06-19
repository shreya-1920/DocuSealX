import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Components/Sidebar";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            token ? (
              <div className="flex min-h-screen bg-[#F8FAFC]">
                <Sidebar />

                <div className="flex-1 overflow-y-auto p-6">
                  <Dashboard />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Documents */}

        <Route
          path="/documents"
          element={
            token ? (
              <Documents />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Audit Logs */}

        <Route
          path="/audit"
          element={
            token ? (
              <AuditLogs />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            token ? (
              <Settings />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
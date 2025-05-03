import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuthInit } from "./hooks/useAuthInit";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};
const GuestOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const App: React.FC = () => {
  useAuthInit();

  const initialized = useSelector((state: RootState) => state.auth.initialized);

  if (!initialized) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>
    );
  }

  return (
    <Router>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/login"
              element={
                <GuestOnlyRoute>
                  <Login />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestOnlyRoute>
                  <Register />
                </GuestOnlyRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

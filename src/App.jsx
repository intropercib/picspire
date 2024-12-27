import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import useAuthStore from "./components/store/useAuthStore";
import ProtectedRoute from "./routes/ProtectedRoute";
import { protectedRoutes, publicRoutes } from "./routes/RouteComponent";

const App = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Layout>
      <Routes>
        {/* Protected Routes */}
        {protectedRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Element />
              </ProtectedRoute>
            }
          />
        ))}

        {/* Public Routes */}
        {publicRoutes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              authUser && path === "/signup" ? <Navigate to="/" /> : <Element />
            }
          />
        ))}
      </Routes>
    </Layout>
  );
};

export default App;

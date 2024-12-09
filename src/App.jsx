import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import SignUpForm from "./components/AuthForm/SignUpForm";
import Layout from "./Layout/Layout";
import Profile from "./pages/Profile/Profile";
import useAuthStore from "./components/store/authStore";

const App = () => {
  const authUser = useAuthStore((state) => state.user);
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Auth />} />
          <Route
            path="/signup"
            element={!authUser ? <SignUpForm /> : <Navigate to="/" />}
          />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;

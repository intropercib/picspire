import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import SignUpForm from "./components/AuthForm/SignUpForm";
import Layout from "./Layout/Layout";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;

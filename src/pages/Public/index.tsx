import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default PublicRoutes;

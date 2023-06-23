import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import CollectionPage from "./CollectionPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:username/:collectionName" element={<CollectionPage />} />
    </Routes>
  );
};

export default PublicRoutes;

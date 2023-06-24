import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import CollectionPage from "./CollectionPage";
import ItemPage from "./ItemPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:username/:_id" element={<ItemPage />} />
    </Routes>
  );
};

export default PublicRoutes;

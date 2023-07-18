import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import ItemPage from "./ItemPage";
import { useAppSelector } from "../../shared/hooks";
import { Header } from "../../shared/components";
import CollectionPage from "./CollectionPage";
import ResultPage from "./SearchResult";

const PublicRoutes = () => {
  const lang = useAppSelector((state) => state.app.lang);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/item/:username/:_id" element={<ItemPage />} />
        <Route
          path="/collection/:username/:collection"
          element={<CollectionPage />}
        />
        <Route path="/search/:type/:id" element={<ResultPage />} />

        <Route
          path="/*"
          element={
            <div className="container">
              <h1>{lang === "Ru" ? "Нету такой страницы" : "Empty Page"}</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default PublicRoutes;

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getThemes } from "../../../store/collections";

const AppControl = () => {
  const dispatch = useAppDispatch();
  const themes = useAppSelector((state) => state.collections.themes);
  const { darkMode, lang } = useAppSelector((state) => state.app);
  useEffect(() => {
    dispatch(getThemes());
  }, []);
  return (
    <div className="container">
      <h2>{lang === "En" ? "All Themes" : "Все темы"}</h2>
      {themes.map((e) => (
        <p>{lang === "En" ? e.theme : e.themeRu}</p>
      ))}
    </div>
  );
};

export default AppControl;

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { createTheme, getThemes } from "../../../store/collections";
import { Box, Button, FormControl, TextField } from "@mui/material";
import s from "./index.module.scss";
import { useFormik } from "formik";
import { toast } from "react-toastify";
const AppControl = () => {
  const dispatch = useAppDispatch();
  const themes = useAppSelector((state) => state.collections.themes);
  const { darkMode, lang } = useAppSelector((state) => state.app);
  const token = useAppSelector((state) => state.user.adminToken);
  const formik = useFormik({
    initialValues: {
      theme: "",
      themeRu: "",
    },
    onSubmit: ({ theme, themeRu }) => {
      dispatch(createTheme({ theme, themeRu, token })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast(lang === "En" ? "Created" : "Сохранено", { type: "success" });
        }
      });
    },
  });
  useEffect(() => {
    dispatch(getThemes());
  }, []);

  return (
    <div className={"container " + s.root}>
      <h1>{lang === "En" ? "Create Theme" : "Создать тему"}</h1>
      <Box
        sx={{
          maxWidth: "320px",
        }}
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <FormControl
            fullWidth
            sx={{
              marginBottom: "20px",
            }}
            className={darkMode ? s.darkInput : ""}
          >
            <TextField
              onChange={formik.handleChange}
              sx={{
                marginBottom: "20px",
              }}
              placeholder={
                lang === "En"
                  ? "Name of theme in english"
                  : "Имя темы на английском"
              }
              id="theme"
            />{" "}
            <TextField
              className={darkMode ? s.darkInput : ""}
              onChange={formik.handleChange}
              id="themeRu"
              placeholder={
                lang === "En"
                  ? "Name of theme in russian"
                  : "Имя темы на русском"
              }
            />
          </FormControl>
          <Button variant="contained" type="submit">
            {lang === "En" ? "Create theme" : "Создать тему"}
          </Button>
        </form>
      </Box>
      <h2>{lang === "En" ? "All Themes" : "Все темы"}</h2>
      {themes.map((e) => (
        <p>{lang === "En" ? e.theme : e.themeRu}</p>
      ))}
    </div>
  );
};

export default AppControl;

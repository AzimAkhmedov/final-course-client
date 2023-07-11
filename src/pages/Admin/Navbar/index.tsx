import { Avatar, IconButton, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { changeLang, changeMode, handleSidebar } from "../../../store/app";
import styles from "./index.module.scss";
import {
  Person,
  QueryStats,
  Menu,
  Close,
  NightShelter,
  ModeNight,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { adminSidebar, darkMode, lang } = useAppSelector((state) => state.app);

  const navigate = useNavigate();
  const handleChangeMode = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMode(e.target.checked));
  };
  const handleChangeLang = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLang(e.target.checked));
  };
  return (
    <div
      className={styles.navbar + "  "}
      style={{
        background: darkMode ? "#000" : "",
      }}
    >
      <div
        className={styles.leftHeader}
        onClick={() => {
          dispatch(handleSidebar());
        }}
      >
        <IconButton
          style={{
            color: darkMode ? "#fff" : "",
          }}
          className={`fa-solid fa-bars ${
            !adminSidebar
              ? styles.menuHamburger
              : styles.menuHamburger + " " + styles.opened
          }`}
        >
          {adminSidebar ? <Close /> : <Menu />}
        </IconButton>
      </div>
      <div className={styles.rightHeader}>
        <ul>
          <li>
            Ру
            <Switch
              onChange={handleChangeLang}
              checked={lang === "En"}
              inputProps={{ "aria-label": "controlled" }}
            />
            En
          </li>

          <li>
            {lang === "En" ? "Light" : "День"}
            <Switch
              checked={darkMode}
              onChange={handleChangeMode}
              inputProps={{ "aria-label": "controlled" }}
            />
            {lang === "En" ? "Dark" : "Ночь"}
          </li>
          <li>
            <IconButton
              onClick={() => {
                navigate("/profile");
              }}
              color="inherit"
            >
              <Person />
            </IconButton>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

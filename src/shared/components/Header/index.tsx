import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import BasicMenu from "./Menu";
import s from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IconButton, Switch } from "@mui/material";
import { changeLang, changeMode } from "../../../store/app";
import { Menu } from "@mui/icons-material";

const Header = () => {
  const { isAuth, username } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <header className={s.root}>
      <div className="container">
        <div className={s.burger}>
          <IconButton
            color="warning"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Menu />
          </IconButton>
        </div>
        <nav className={open ? s.open : ""}>
          <ul>
            <li className="search">
              <input type="text" name="" id="" />
            </li>
            <li>
              {isAuth ? (
                <NavLink to={"/profile"}>{username}</NavLink>
              ) : (
                <BasicMenu />
              )}
            </li>
            <li>
              Dark Mode
              <Switch
                onClick={() => {
                  dispatch(changeMode());
                }}
              />
            </li>
            <li>
              Ru
              <Switch
                onClick={() => {
                  dispatch(changeLang());
                }}
              />
              Eng
            </li>
          </ul>
        </nav>
        <div className="bc"></div>
      </div>
    </header>
  );
};

export default Header;

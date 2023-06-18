import React from "react";
import { NavLink } from "react-router-dom";
import BasicMenu from "./Menu";
import s from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Switch } from "@mui/material";
import { changeLang, changeMode } from "../../../store/app";

const Header = () => {
  const { isAuth, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <header className={s.root}>
      <div className="container">
        <nav>
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
      </div>
    </header>
  );
};

export default Header;

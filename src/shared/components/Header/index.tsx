import React from "react";
import { NavLink } from "react-router-dom";
import BasicMenu from "./Menu";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <header className={s.root}>
      <div className="container">
        <nav>
          <ul>
            <li className="search">
              <input type="text" name="" id="" />
            </li>
            <li>
              <BasicMenu />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

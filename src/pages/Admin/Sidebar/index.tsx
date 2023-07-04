import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import { useState } from "react";
import {
  Add,
  Home,
  InsertDriveFile,
  List,
  People,
  PlusOne,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppSelector } from "../../../shared/hooks";

const SideBar = () => {
  const open = useAppSelector((state) => state.app.adminSidebar);

  return (
    <div className={styles.dashboardSideBar}>
      <div className={`${styles.sidebar} ${!open ? styles.close : ""}`}>
        <div className={styles.logoDetails}>
          <i className="bx bxl-c-plus-plus"></i>
          <span className={styles.logo_name}>prod by Azim</span>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : ""
              }
              to={"/admin/add"}
            >
              <IconButton>
                <Add />
              </IconButton>
              <span className={styles.link_name}>
                {" "}
                Добавить  коллекцию
              </span>
            </NavLink>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <NavLink to="/admin/add" className={styles.link_name}>
                  Добавить  коллекцию
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : ""
              }
              to={"/admin/catalogs"}
            >
              <IconButton>
                <List />
              </IconButton>
              <span className={styles.link_name}>Перейти к каталогам</span>
            </NavLink>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <NavLink to="/admin/catalogs" className={styles.link_name}>
                  Посмотреть коллекции
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : ""
              }
              to={"/admin/newDetail"}
            >
              <IconButton>
                <People />
              </IconButton>
              <span className={styles.link_name}>Посмотреть пользователей</span>
            </NavLink>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <NavLink to="/admin/newDetail" className={styles.link_name}>
                  Посмотреть пользователей
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : ""
              }
              to={"/admin/"}
            >
              <IconButton>
                <InsertDriveFile />
              </IconButton>
              <span className={styles.link_name}>Все предметы</span>
            </NavLink>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <NavLink to="/admin/" className={styles.link_name}>
                  Все Предметы
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : ""
              }
              to={"/"}
            >
              <IconButton>
                <Home />
              </IconButton>
              <span className={styles.link_name}> Домашняя страница</span>
            </NavLink>
            <ul className={`${styles.subMenu} ${styles.blank}`}>
              <li>
                <NavLink to="/" className={styles.link_name}>
                  Домашняя страница
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BasicMenu from "./Menu";
import s from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Autocomplete, IconButton, Switch } from "@mui/material";
import { changeLang, changeMode } from "../../../store/app";
import { Close, Menu } from "@mui/icons-material";

const Header = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.style.height = open ? "100vh" : "";
  }, [open]);
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
            {open ? <Close /> : <Menu />}
          </IconButton>
        </div>
        <nav className={open ? s.open : ""}>
          <ul>
            <li
              className={s.logo}
              onClick={() => {
                navigate("/");
              }}
            >
              prod by Az
            </li>
            <li className="search">
              <Autocomplete
                placeholder="Type to search"
                options={["Ez", "Searxc"]}
                renderInput={(e) => <p>{e.id}</p>}
                id=""
              />
            </li>
            <li>
              {isAuth ? (
                <NavLink to={"/profile"}>
                  {lang === "En" ? "Go to profile" : "Открыть профиль"}
                </NavLink>
              ) : (
                <BasicMenu />
              )}
            </li>
            <li>
              <IconButton
                onChange={() => {
                  dispatch(changeMode());
                }}
              >
                <svg width="0" height="0">
                  <defs>
                    <clipPath id="moon">
                      <path d="m27.5,25c-6.904,0-12.5-5.596-12.5-12.5,0-5.76,3.897-10.606,9.196-12.055C22.843.155,21.44,0,20,0,8.954,0,0,8.954,0,20s8.954,20,20,20,20-8.954,20-20c0-1.44-.155-2.843-.445-4.196-1.449,5.3-6.296,9.196-12.055,9.196Z" />
                    </clipPath>
                  </defs>
                </svg>
                <label className="switch">
                  <span className="switch__icon switch__icon--light">
                    <span className="switch__icon-part switch__icon-part--1"></span>
                    <span className="switch__icon-part switch__icon-part--2"></span>
                    <span className="switch__icon-part switch__icon-part--3"></span>
                    <span className="switch__icon-part switch__icon-part--4"></span>
                    <span className="switch__icon-part switch__icon-part--5"></span>
                    <span className="switch__icon-part switch__icon-part--6"></span>
                    <span className="switch__icon-part switch__icon-part--7"></span>
                    <span className="switch__icon-part switch__icon-part--8"></span>
                    <span className="switch__icon-part switch__icon-part--9"></span>
                  </span>
                  <input
                    className="switch__input"
                    type="checkbox"
                    defaultChecked={darkMode}
                    role="switch"
                  />
                  <span className="switch__icon switch__icon--dark">
                    <span className="switch__icon-part switch__icon-part--1">
                      <span className="switch__icon-part switch__icon-part--1a"></span>
                      <span className="switch__icon-part switch__icon-part--1b"></span>
                    </span>
                  </span>
                  <span className="switch__label">Dark Mode</span>
                </label>
              </IconButton>
            </li>
            <li>
              Ру
              <Switch
                defaultChecked={lang === "En"}
                onClick={() => {
                  dispatch(changeLang());
                }}
              />
              Eng
            </li>
            {role === "Admin" ? (
              <li
                onClick={() => {
                  navigate("/admin");
                }}
              >
                {lang === "Ru" ? "Админ" : "Admin"}
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
        <div
          className={open ? s.bc : ""}
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;

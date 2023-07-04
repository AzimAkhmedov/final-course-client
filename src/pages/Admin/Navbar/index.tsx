import { Avatar, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { handleSidebar } from "../../../store/app";
import styles from "./index.module.scss";
import { Person, QueryStats, Menu, Close } from "@mui/icons-material";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.app.adminSidebar);

  return (
    <div className={styles.navbar}>
      <div
        className={styles.leftHeader}
        onClick={() => {
          dispatch(handleSidebar());
        }}
      >
        <IconButton
          className={`fa-solid fa-bars ${
            !open
              ? styles.menuHamburger
              : styles.menuHamburger + " " + styles.opened
          }`}
        >
          {open ? <Close /> : <Menu />}
        </IconButton>
      </div>
      <div className={styles.rightHeader}>
        <ul>
          <li>
            <IconButton>
              <Person />
            </IconButton>
          </li>
          <li>
            <i className="fas fa-cog">
              <IconButton>
                <QueryStats />
              </IconButton>
            </i>
          </li>
          <li>
            <i className="fas fa-user"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { lang } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        style={{ color: "var(--orange)", textTransform: "none" }}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {lang === "En" ? "Enter to app" : "Войти"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(e) => {
            handleClose();
            navigate("/register");
          }}
        >
          {" "}
          {lang === "En" ? "Register" : "Регистрация"}
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            navigate("/login");
          }}
        >
          {lang === "En" ? "Have a profile?" : "Есть профиль?"}
        </MenuItem>
      </Menu>
    </div>
  );
}

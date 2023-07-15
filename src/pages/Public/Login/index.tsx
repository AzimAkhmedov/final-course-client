import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { useFormik } from "formik";
import { ILoginProps } from "../../../types";
import { Login, isAdmin } from "../../../store/user";

import { Button, Input } from "@mui/material";
import s from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loader } = useAppSelector((state) => state.user);
  const { lang, darkMode } = useAppSelector((state) => state.app);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit({ password, username }) {
      const newUser: ILoginProps = {
        username,
        password,
      };

      dispatch(Login(newUser)).then((res) => {
        if (res.meta.requestStatus == "fulfilled") {
          dispatch(isAdmin({ username, password }));
          navigate("/profile");
          toast(lang === "En" ? "Welcome " : "Добро пожаловать " + username, {
            type: "success",
          });
        } else {
          toast(
            lang === "En"
              ? " Error, credentials are wrong   "
              : " Ошибка, данные не правильные ",
            { type: "error" }
          );
        }
      });
    },
  });
  return loader ? (
    <>Loading</>
  ) : (
    <div className={"container " + s.root}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.field}>
          <Input
            placeholder="Your Username"
            id="username"
            sx={{
              color: darkMode ? "#fff" : "",
              border: darkMode ? "#fff 2px solid" : "",
            }}
            onChange={formik.handleChange}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            sx={{
              color: darkMode ? "#fff" : "",
              border: darkMode ? "#fff 2px solid" : "",
            }}
            id="password"
            onChange={formik.handleChange}
            required
          />

          <Button type="submit" variant="contained">
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

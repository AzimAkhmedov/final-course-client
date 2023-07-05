import React from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { useFormik } from "formik";
import { ILoginProps } from "../../../types";
import { Login } from "../../../store/user";

import { Button, Checkbox, Input } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import s from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loader } = useAppSelector((state) => state.user);
  const { lang } = useAppSelector((state) => state.app);

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
      console.log(newUser);

      dispatch(Login(newUser)).then((res) => {
        if (res.meta.requestStatus == "fulfilled") {
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
        <div className="field">
          <Button variant="outlined" color="secondary">
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>
        <div className={s.field}>or</div>
        <div className={s.field}>
          <Input
            placeholder="Your Username"
            id="username"
            onChange={formik.handleChange}
            required
          />
          <Input
            placeholder="Password"
            id="password"
            onChange={formik.handleChange}
            required
          />
          <div className="checkbox">
            <Checkbox
              onChange={(e) => {
                console.log(e.target.checked);
              }}
            />
            <span>Stay Signed</span>
          </div>
          <Button type="submit" variant="contained">
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

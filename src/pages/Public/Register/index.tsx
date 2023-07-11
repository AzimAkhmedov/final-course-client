import s from "./Register.module.scss";
import { Button, Input } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../shared/hooks";
import { Registration } from "../../../store/user";
import { IAuthProps } from "../../../types";
import { useNavigate } from "react-router-dom";
import { LangHandler } from "../../../utils/checkLang";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit({ password, username }) {
      const newUser: IAuthProps = {
        username,
        password,
        role: "User",
      };

      dispatch(Registration(newUser)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/profile");
        }
      });
    },
  });
  return (
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
            placeholder={LangHandler("Ваш юзернейм", "Your username")}
            id="username"
            onChange={formik.handleChange}
            required
          />
          <Input
            placeholder={LangHandler("Ваш пароль", "Your password")}
            type="password"
            id="password"
            onChange={formik.handleChange}
            required
          />
          <Button type="submit" variant="contained">
            {LangHandler("Создать", "Create")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;

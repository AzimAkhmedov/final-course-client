import s from "./Register.module.scss";
import { Button, Checkbox, Input } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../shared/hooks";
import { Registration } from "../../../store/user";
import { IAuthProps } from "../../../types";
import { useNavigate } from "react-router-dom";
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
      console.log(newUser);

      dispatch(Registration(newUser)).then((res) => {
        if (res.meta.requestStatus == "fulfilled") {
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
            Create Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;

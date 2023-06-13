import React from "react";
import s from "./Register.module.scss";
import { Button, Input } from "@mui/material";
const Register = () => {
  return (
    <div className={"container " + s.root}>
      <form action="">
        <h1>Fill form</h1>
        <Input placeholder="Your Name" required />
        <Input placeholder="Password" required />
        <Input placeholder="Repeat Password" required />
        <Input placeholder="About You" required />
        <Button variant="contained">Submit</Button>
      </form>
    </div>
  );
};

export default Register;

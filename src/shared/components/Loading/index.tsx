import React from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import s from "./Loading.module.scss";
const Loading = () => {
  return (
    <div className={s.root}>
      <HourglassBottomIcon />
    </div>
  );
};

export default Loading;

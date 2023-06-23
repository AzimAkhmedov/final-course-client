import React from "react";
import { ICollection } from "../../../../types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ArrowRightAlt, Favorite, MoreVert } from "@mui/icons-material";
import { useAppSelector } from "../../../../shared/hooks";
import { useNavigate } from "react-router-dom";

const Collection = ({
  collectionName,
  params,
  username,
  description,
}: ICollection) => {
  const { darkMode, lang } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        transition: ".5s",
        width: 320,
        maxHeight: 220,
        background: darkMode ? "black" : "",
        color: darkMode ? "#fff" : "",
        border: darkMode ? "solid 1px #fff" : "",
      }}
    >
      <CardHeader title={collectionName} subheader={username} />
      <CardContent>
        <Typography variant="body2">{description} </Typography>
      </CardContent>
      <CardActions
        sx={{ cursor: "pointer" }}
        onClick={() => {
          console.log("click");
          navigate("/" + username + "/" + collectionName);
        }}
      >
        {lang === "En" ? "See collection " : "Посмотреть коллекцию"}{" "}
        <IconButton
          sx={{
            color: darkMode ? "#fff" : "",
          }}
        >
          {" "}
          <ArrowRightAlt />
        </IconButton>
        {/* <Button variant="contained" color="warning"></Button> */}
      </CardActions>
    </Card>
  );
};

export default Collection;

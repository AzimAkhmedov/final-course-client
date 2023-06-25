import React from "react";
import { ICollection, IItem } from "../../../../types";
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
import { ArrowRightAlt } from "@mui/icons-material";
import { useAppSelector } from "../../../../shared/hooks";
import { useNavigate } from "react-router-dom";

const Item = ({ collectionName, params, username, tags, _id }: IItem) => {
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
      <CardHeader title={params.name} subheader={collectionName} />
      <CardContent>
        <Typography variant="body2">{username} </Typography>
        <Typography variant="body2">{tags[0]} </Typography>
        {Object.keys(params).map((key) =>
          key === "name" ? (
            <></>
          ) : (
            <Typography
              sx={{
                fontSize: 14,
              }}
              gutterBottom
            >
              {key}:
              <span
                style={
                  params[key][0] === "#" && params[key].length === 7
                    ? {
                        background: params[key],
                        color: params[key],

                        width: 60,
                      }
                    : {}
                }
              >
                {params[key][0] === "#" && params[key].length === 7
                  ? "color "
                  : params[key]}
              </span>
            </Typography>
          )
        )}
      </CardContent>
      <CardActions
        sx={{ cursor: "pointer" }}
        onClick={() => {
          console.log("click");
          navigate("/" + username + "/" + _id);
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

export default Item;

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

const Item = ({
  itemName,
  collectionName,
  params,
  username,
  tags,
  _id,
}: IItem) => {
  const { darkMode, lang } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        transition: ".5s",
        width: 320,
        minHeight: 300,
        maxHeight: 320,
        background: darkMode ? "black" : "",
        color: darkMode ? "#fff" : "",
        border: darkMode ? "solid 1px #fff" : "",
      }}
    >
      <CardHeader title={itemName} subheader={collectionName} />
      <CardContent sx={{ minHeight: 180 }}>
        <Typography variant="body2">{username} </Typography>
        <Typography variant="body2">{tags[0]} </Typography>
        {Object.keys(params).map((key, I) =>
          I > 2 ? (
            <React.Fragment key={key + I}></React.Fragment>
          ) : (
            <Typography
              sx={{
                fontSize: 14,
              }}
              gutterBottom
              key={key + I}
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
                  ? "    "
                  : params[key]}
              </span>
            </Typography>
          )
        )}
        {Object.keys(params).length > 3 ? (
          <Typography
            sx={{
              fontSize: 20,
            }}
          >
            ...
          </Typography>
        ) : (
          <></>
        )}
      </CardContent>
      <CardActions
        sx={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/item/" + username + "/" + _id);
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
      </CardActions>
    </Card>
  );
};

export default Item;

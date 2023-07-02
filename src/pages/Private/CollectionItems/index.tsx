import { useEffect, useState, Fragment } from "react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import s from "./CreateItem.module.scss";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { getItems, removeFromCollection } from "../../../store/items";
import Toolbar from "./Toolbar";
import Loading from "../../../shared/components/Loading";
import { MoreVert } from "@mui/icons-material";
import { toast } from "react-toastify";
const CreateItem = () => {
  const { collection } = useParams();
  const [anchorEl, setAnchorEl] = useState<Array<HTMLElement | null>>([]);

  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const { itemsLoader, items } = useAppSelector((state) => state.items);
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => (i: number) => {
    let newArr = new Array(items.length).fill(null);

    newArr[i] = event.currentTarget;

    setAnchorEl(newArr);
  };
  const handleClose = () => {
    setAnchorEl(new Array(items.length).fill(null));
  };

  useEffect(() => {
    dispatch(getItems({ username, collectionName: collection }));
  }, []);
  return itemsLoader ? (
    <Loading />
  ) : (
    <div className={"container " + s.root}>
      <h1>{collection}</h1>
      {items.length === 0 ? (
        <Box sx={{ maxWidth: 420 }}>
          <p>
            {lang === "Ru" ? (
              <>
                {" "}
                Кажется тут пока пусто, добавьте в вашу коллекцию новые предметы
                и они появяться тут
              </>
            ) : (
              <>It seems that this collection is empty</>
            )}
          </p>
          <Toolbar collection={collection} />
        </Box>
      ) : (
        <div className={s.parent}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {items.map((e, i) => (
              <Card
                sx={{
                  minWidth: 275,
                  background: darkMode ? "black" : "#fff",
                  transition: ".5s",
                  color: darkMode ? "#fff" : "black",
                  borderColor: darkMode ? "#fff" : "",
                }}
                key={i}
                color={""}
                variant="outlined"
              >
                <CardHeader
                  title={e.params.name}
                  action={
                    <>
                      <IconButton
                        sx={{
                          color: darkMode ? "#fff" : "",
                        }}
                        aria-controls={
                          Boolean(anchorEl[i])
                            ? "demo-positioned-menu" + i
                            : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={
                          Boolean(anchorEl[i]) ? "true" : undefined
                        }
                        onClick={(e) => {
                          handleClick(e)(i);
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        id={"demo-positioned-menu" + i}
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl[i]}
                        open={Boolean(anchorEl[i])}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            dispatch(removeFromCollection(String(e._id))).then(
                              (res) => {
                                if (res.meta.requestStatus === "fulfilled") {
                                  toast(
                                    lang === "Ru"
                                      ? "Успешно удалено"
                                      : "Deleted Successfuly",
                                    { type: "success" }
                                  );
                                } else {
                                  toast(lang === "Ru" ? "Ошибка" : "Error ", {
                                    type: "error",
                                  });
                                }
                              }
                            );

                            handleClose();
                          }}
                        >
                          {lang === "Ru" ? "Удалить" : "Delete"}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          {lang === "Ru" ? "Изменить" : "Update"}
                        </MenuItem>
                      </Menu>
                    </>
                  }
                />
                <CardContent>
                  {Object.keys(e.params).map((a) =>
                    a === "name" ? (
                      <Fragment key={a + i}></Fragment>
                    ) : (
                      <Typography
                        key={a + i}
                        sx={{
                          fontSize: 14,
                        }}
                        gutterBottom
                      >
                        {a}:
                        <span
                          style={
                            e.params[a][0] === "#" && e.params[a].length === 7
                              ? {
                                  background: e.params[a],
                                  color: e.params[a],

                                  width: 60,
                                }
                              : {}
                          }
                        >
                          {e.params[a][0] === "#" && e.params[a].length === 7
                            ? "color "
                            : e.params[a]}
                        </span>
                      </Typography>
                    )
                  )}
                  Посмотреть предмет
                </CardContent>
              </Card>
            ))}
          </Box>
          <aside>
            <Toolbar collection={collection} />
          </aside>
        </div>
      )}
    </div>
  );
};

export default CreateItem;

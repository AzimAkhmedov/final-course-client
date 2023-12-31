import { useEffect, useState, Fragment } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import s from "./CreateItem.module.scss";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { getItems, removeFromCollection } from "../../../store/items";
import Toolbar from "./Toolbar";
import Loading from "../../../shared/components/Loading";
import { Cancel, CheckRounded, MoreVert } from "@mui/icons-material";
import { toast } from "react-toastify";
import EditBar from "./EditBar";
import { IItem } from "../../../types";
const CreateItem = () => {
  const { collection } = useParams();
  const [anchorEl, setAnchorEl] = useState<Array<HTMLElement | null>>([]);
  const [currentEdit, setCurrentEdit] = useState<IItem>({
    collectionName: "",
    params: {},
    tags: [],
    itemName: "",
    username: "",
    _id: "",
  });

  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const { itemsLoader, items } = useAppSelector((state) => state.items);
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => (i: number) => {
    let newArr = new Array(items.length).fill(null);
    newArr[i] = event.currentTarget;
    setAnchorEl(newArr);
  };
  const navigate = useNavigate();
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
                  title={e.itemName}
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
                        <MenuItem
                          onClick={() => {
                            setCurrentEdit(e);
                            setOpen(true);
                            handleClose();
                          }}
                        >
                          {lang === "Ru" ? "Изменить" : "Update"}
                        </MenuItem>
                      </Menu>
                    </>
                  }
                />
                <CardContent>
                  {Object.keys(e.params).map((a) =>
                    typeof e.params[a] === "boolean" ? (
                      <Typography
                        key={a + i}
                        sx={{
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                        }}
                        gutterBottom
                      >
                        {a}: {e.params[a] ? <CheckRounded /> : <Cancel />}
                      </Typography>
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
                </CardContent>
                <CardActions
                  onClick={() => {
                    navigate("/item/" + e.username + "/" + e._id);
                  }}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                    }}
                    variant="subtitle2"
                  >
                    {lang === "En" ? "See Item" : "Посмотреть Предмет"}
                  </Typography>
                </CardActions>
              </Card>
            ))}
          </Box>
          <aside>
            <Toolbar collection={collection} />
            <EditBar
              itemName={currentEdit.itemName}
              collection={String(collection)}
              _id={currentEdit._id}
              open={open}
              setOpen={setOpen}
            />
          </aside>
        </div>
      )}
    </div>
  );
};

export default CreateItem;

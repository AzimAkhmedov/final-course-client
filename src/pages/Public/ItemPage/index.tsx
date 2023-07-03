import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import {
  getComments,
  getIsLiked,
  getLikes,
  getSingleItem,
  pressLike,
  writeComment,
} from "../../../store/items";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Textarea } from "@mui/joy";
import {
  AccountCircle,
  Favorite,
  FavoriteBorder,
  Telegram,
} from "@mui/icons-material";
import Loading from "../../../shared/components/Loading";
import { useFormik } from "formik";
import s from "./Item.module.scss";
import { toast } from "react-toastify";
const ItemPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentItem, itemsLoader, comments, likes, isLiked } = useAppSelector(
    (state) => state.items
  );
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const authorName = useAppSelector((state) => state.user.username);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: String(params.username),
      authorName,
      comment: "",
      itemId: String(params._id),
    },
    onSubmit: (val) => {
      if (val.comment.length !== 0) {
        dispatch(
          writeComment({ ...val, collectionName: currentItem.collectionName })
        );
      } else {
        toast(
          lang === "En"
            ? "Bro is trying to send empty comment 💀"
            : "Нельзя отправить пустой коммент",
          { type: "error" }
        );
      }
    },
  });

  useEffect(() => {
    dispatch(getSingleItem(String(params._id)));
    dispatch(getLikes(String(params._id)));
    dispatch(getComments(String(params._id)));
  }, []);
  useEffect(() => {
    dispatch(getIsLiked({ itemId: params._id, wholikes: authorName }));
    console.log(likes);
  }, [likes]);
  return itemsLoader ? (
    <Loading />
  ) : (
    <div className={"container " + s.root}>
      <Typography variant="h2">{currentItem.params.name}</Typography>
      <Typography variant="subtitle1">{currentItem.collectionName}</Typography>
      <Typography variant="subtitle2">{currentItem.username}</Typography>
      <IconButton
        sx={{
          color: isLiked ? "red" : "",
        }}
        onClick={(e) => {
          dispatch(
            pressLike({
              collectionName: currentItem.collectionName,
              itemId: String(currentItem._id),
              username: currentItem.username,
              wholikes: authorName,
            })
          );
        }}
      >
        {isLiked ? <Favorite /> : <FavoriteBorder />}
        {likes.length}
      </IconButton>

      <Box sx={{ mb: "150px" }} width={"50%"}>
        {Object.keys(currentItem.params).map((key, i) =>
          key === "name" ? (
            <Fragment key={key + i}></Fragment>
          ) : (
            <Typography variant="body1" key={key + i}>
              {key} : {currentItem.params[key]}
            </Typography>
          )
        )}
      </Box>
      <Box className={s.fill}>
        <h2>{lang === "En" ? "Сomments" : "Коментраии"}</h2>
        <form className={s.form} onSubmit={handleSubmit}>
          <Textarea
            placeholder={
              lang === "Ru" ? "Ваш коментраий..." : "Your comments..."
            }
            id="comment"
            name="comment"
            onChange={handleChange}
            minRows={2}
            sx={{ width: "70%" }}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="warning"
            sx={{
              color: darkMode ? "#fff" : "",
              background: darkMode ? "gray" : "",
            }}
            className={s.btn}
            disabled={!isAuth}
            type="submit"
          >
            <Telegram />
          </Button>
        </form>
        {comments.map((e: any) => (
          <div className={s.comment} key={e._id}>
            <h4 className={s.subtitle}>
              <AccountCircle />
              {e.authorName}
            </h4>
            <h3 className={s.content}>{e.comment}</h3>
            <p className={s.time}>{e.time} </p>
          </div>
        ))}
        {comments.length === 0 ? (
          <h3>
            {lang === "Ru"
              ? "Пока коментарий нет, напишите и станьте певым"
              : "No comments yet, write and be first"}
          </h3>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};

export default ItemPage;

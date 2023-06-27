import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getComments, getSingleItem, writeComment } from "../../../store/items";
import { Box, IconButton, Typography } from "@mui/material";
import { Textarea } from "@mui/joy";
import { AccountCircle, Telegram } from "@mui/icons-material";
import Loading from "../../../shared/components/Loading";
import { useFormik } from "formik";
import s from "./Item.module.scss";
const ItemPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentItem, itemsLoader, comments } = useAppSelector(
    (state) => state.items
  );
  const { lang, darkMode } = useAppSelector((state) => state.app);
  const authorName = useAppSelector((state) => state.user.username);
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: String(params.username),
      // collectionName: currentItem.collectionName,
      authorName,
      comment: "",
      itemId: String(params._id),
    },
    onSubmit: (val) => {
      dispatch(
        writeComment({ ...val, collectionName: currentItem.collectionName })
      );
      console.log({ ...val, collectionName: currentItem.collectionName });
    },
  });

  useEffect(() => {
    dispatch(getSingleItem(String(params._id)));
    dispatch(getComments(String(params._id)));
  }, []);
  return itemsLoader ? (
    <Loading />
  ) : (
    <div className={"container " + s.root}>
      <h1>{currentItem.params.name}</h1>
      <Typography variant="subtitle1">{currentItem.collectionName}</Typography>
      <Typography variant="subtitle2">{currentItem.username}</Typography>

      <Box width={"50%"}>
        {Object.keys(currentItem.params).map((key, i) =>
          key === "name" ? (
            <Fragment key={key + i}></Fragment>
          ) : (
            <p key={key + i}>
              {key} : {currentItem.params[key]}
            </p>
          )
        )}
      </Box>
      <Box>
        <h2>{lang === "En" ? "Сomments" : "Коментраии"}</h2>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder={
              lang === "Ru" ? "Ваш коментраий..." : "Your comments..."
            }
            id="comment"
            name="comment"
            onChange={handleChange}
            minRows={2}
            variant="outlined"
          />
          <IconButton type="submit">
            <Telegram />
          </IconButton>
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

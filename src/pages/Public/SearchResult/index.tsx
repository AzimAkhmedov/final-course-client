import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getComments, getSingleItem } from "../../../store/items";
import { Box } from "@mui/material";
import { getCurrentCollectionById } from "../../../store/collections";
import Item from "../Home/Item";
import Loading from "../../../shared/components/Loading";
import s from "./index.module.scss";
const ResultPage = () => {
  const params = useParams();
  const [loader, setLoader] = useState(true);
  const dispatch = useAppDispatch();
  const { currentItem, comments } = useAppSelector((state) => state.items);
  const currentCollection = useAppSelector(
    (state) => state.collections.currentCollection
  );
  const lang = useAppSelector((state) => state.app.lang);
  const handleGetCurrentItem = () => {
    setLoader(true);

    dispatch(getSingleItem(params.id as string)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setLoader(false);
      }
    });
  };
  const handleGetComments = () => {
    setLoader(true);

    dispatch(getSingleItem(params.id as string));
    dispatch(getComments(params.id as string)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setLoader(false);
      }
    });
  };
  const handleGetCurrentCollection = () => {
    setLoader(true);

    dispatch(getCurrentCollectionById(params.id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setLoader(false);
      }
    });
  };
  useEffect(() => {
    if (params.type === "item") {
      handleGetCurrentItem();
    } else if (params.type === "comment") {
      handleGetComments();
    } else if (params.type === "collection") {
      handleGetCurrentCollection();
    }
  }, [params.id]);
  return loader ? (
    <Loading />
  ) : (
    <div className={"container " + s.root}>
      <h1>Результат поиска</h1>
      {params.type === "item" ? (
        <>
          {" "}
          <h2>Предмет</h2>
          <h2>{currentItem.itemName}</h2>
          <p>{currentItem.username}</p>
          {Object.keys(currentItem.params).map((e) => (
            <p>
              {e}:{currentItem.params[e]}
            </p>
          ))}
          <NavLink to={"/item/" + currentItem._id}>Посмотреть предмет </NavLink>
        </>
      ) : params.type === "comment" ? (
        <>
          <Box
            sx={{
              marginBottom: "40px",
            }}
          >
            <h2>Комментарий</h2>
            <h1>{currentItem.itemName}</h1>
            <p>{currentItem.username}</p>
            {Object.keys(currentItem.params).map((e) => (
              <p>
                {e}:{currentItem.params[e]}
              </p>
            ))}
            <NavLink to={"/item/" + currentItem._id}>
              Посмотреть предмет{" "}
            </NavLink>
          </Box>
          <Box>
            <h3>
              {lang === "En"
                ? "Comments (search found text here)"
                : "Коментарии к предмету (поиск нашел тут)"}
            </h3>
            <div className={s.comments}>
              {comments.map((e) => (
                <div>
                  <p> {e.authorName} </p>

                  <p> {e.comment} </p>
                </div>
              ))}
            </div>
          </Box>
        </>
      ) : (
        <>
          <h2>Коллекция</h2>
          {currentCollection.map((e) => (
            <p>
              <Item
                collectionName={e.collectionName}
                itemName={e.itemName}
                params={e.params}
                tags={e.tags}
                username={e.username}
                key={e._id}
              />
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default ResultPage;

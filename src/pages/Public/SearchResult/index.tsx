import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getComments, getSingleItem } from "../../../store/items";
import { Box } from "@mui/material";
import {
  getCurrentCollection,
  getCurrentCollectionById,
} from "../../../store/collections";
import Item from "../Home/Item";

const ResultPage = () => {
  const params = useParams();
  const [loader, setLoader] = useState(true);
  const dispatch = useAppDispatch();
  const { currentItem, comments, isLiked, likes } = useAppSelector(
    (state) => state.items
  );
  const currentCollection = useAppSelector(
    (state) => state.collections.currentCollection
  );
  const handleGetCurrentItem = () => {
    dispatch(getSingleItem(params.id as string)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setLoader(false);
      }
    });
  };
  const handleGetComments = () => {
    dispatch(getSingleItem(params.id as string));
    dispatch(getComments(params.id as string)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setLoader(false);
      }
    });
  };
  const handleGetCurrentCollection = () => {
    dispatch(getCurrentCollectionById(params.id));
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
  return (
    <div className="container">
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
          <h2>Комментарий</h2>
          <h1>{currentItem.itemName}</h1>
          <p>{currentItem.username}</p>
          {Object.keys(currentItem.params).map((e) => (
            <p>
              {e}:{currentItem.params[e]}
            </p>
          ))}
          <Box>
            {comments.map((e) => (
              <p>
                {e.comment} <span>{e.authorName}</span>
              </p>
            ))}
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

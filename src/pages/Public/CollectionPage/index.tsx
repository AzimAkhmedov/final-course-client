import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCurrentCollection } from "../../../store/collections";
import Item from "../Home/Item";
import api from "../../../shared/api";
import { Box } from "@mui/material";
import { LangHandler } from "../../../utils/checkLang";

const CollectionPage = () => {
  const { username, collection } = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.collections.currentCollection);
  const [img, setImg] = useState({ imgUrl: "" });
  const { lang } = useAppSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCurrentCollection({ username, collection }));
    api
      .getCollectionImg(username as string, collection as string)
      .then((res) => {
        setImg(res);
      });
  }, []);
  return (
    <div className="container">
      <h1>{collection}</h1>
      <Box sx={{ maxWidth: "250px", maxHeight: "300px" }}>
        <img
          style={{
            maxWidth: "350px",
            maxHeight: "300px",
          }}
          src={img.imgUrl}
          alt=""
        />
      </Box>{" "}
      <div className="layout">
        {items.length === 0 ? (
          <h2>{lang === "En" ? "Collection is empty" : "Пустая коллекция"}</h2>
        ) : (
          <></>
        )}
        {items.map((e) => (
          <Item
            collectionName={e.collectionName}
            itemName={e.itemName}
            params={e.params}
            tags={e.tags}
            username={e.username}
            _id={e._id}
            key={e._id}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;

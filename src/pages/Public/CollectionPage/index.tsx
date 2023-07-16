import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCurrentCollection } from "../../../store/collections";
import Item from "../Home/Item";
import api from "../../../shared/api";

const CollectionPage = () => {
  const { username, collection } = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.collections.currentCollection);
  const [img, setImg] = useState("");
  useEffect(() => {
    dispatch(getCurrentCollection({ username, collection }));
    api.getCollectionImg(String(username), String(collection)).then((res) => {
      setImg(res.data.imgUrl);
    });
  }, []);
  return (
    <div className="container">
      <h1>{collection}</h1>
      <img src={img} alt="" />
      <div className="layout">
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

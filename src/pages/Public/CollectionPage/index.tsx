import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCurrentCollection } from "../../../store/collections";
import Item from "../Home/Item";

const CollectionPage = () => {
  const { username, collection, img } = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.collections.currentCollection);
  useEffect(() => {
    dispatch(getCurrentCollection({ username, collection }));
  }, []);
  return (
    <div className="container">
      <h1>{collection}</h1>
      <img alt="Не загружено" src={img} />

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

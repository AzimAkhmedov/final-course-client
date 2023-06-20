import React, { useEffect } from "react";
import s from "./Home.module.scss";
import { Header } from "../../../shared/components";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getLastCollections } from "../../../store/collections";
import Collection from "./Collection";
const Home = () => {
  const list = useAppSelector((state) => state.collections.lastCollections);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLastCollections(1));
  }, []);
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className={"container " + s.root}>
      {list.map(({ collectionName, description, params, username }, i) => (
        <Collection
          collectionName={collectionName}
          description=""
          params={params}
          username={username}
          key={i}
        />
      ))}
    </div>
  );
};

export default Home;

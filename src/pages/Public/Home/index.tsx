import React, { useEffect, useState } from "react";
import s from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getLastCollections } from "../../../store/collections";
import Collection from "./Collection";
import api from "../../../shared/api";
import { Button } from "@mui/material";
const Home = () => {
  const list = useAppSelector((state) => state.collections.lastCollections);
  const [pages, setPages] = useState<number>(1);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLastCollections(1));
    api.getNumberOfPages().then((res) => {
      setPages(res.pages);
    });
  }, []);
  const displayPagination = () => {
    // for (let i = 1; i <= 3; i++) =>(<p>{i}</p>)
  };
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className={"container " + s.root}>
      <h1>Самые Новые Коллекции</h1>

      <main>
        <div className={"layout " + s.layout}>
          {list.map(({ collectionName, description, params, username }, i) => (
            <Collection
              collectionName={collectionName}
              description={description}
              params={params}
              username={username}
              key={i}
            />
          ))}
        </div>
        <aside>Посмотреть коллекции по фильтрам</aside>
      </main>
      <div className={s.pages}>{/* { displayPagination()} */}</div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import s from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import {
  getLastCollections,
  getPagesByTheme,
  getThemes,
} from "../../../store/collections";
import Item from "./Item";
import api from "../../../shared/api";
import { Box, Button } from "@mui/material";
import Loading from "../../../shared/components/Loading";
const Home = () => {
  const list = useAppSelector((state) => state.collections.lastCollections);
  const tags = useAppSelector((state) => state.collections.themes);
  const loading = useAppSelector((state) => state.collections.loading);
  const [active, setActive] = useState<string>("");
  const [pages, setPages] = useState<number>(1);
  const [display, setDisplay] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { darkMode, lang } = useAppSelector((state) => state.app);
  useEffect(() => {
    dispatch(getLastCollections(currentPage));
    dispatch(getThemes());
    api.getNumberOfPages().then((res) => {
      const arr = new Array(res.pages).fill(0);
      setPages(res.pages);
      setDisplay(arr);
    });
  }, []);
  useEffect(() => {
    dispatch(getLastCollections(currentPage));
  }, [currentPage]);
  useEffect(() => {
    console.log(list);
  }, [list]);
  return loading ? (
    <Loading />
  ) : (
    <div className={"container " + s.root}>
      <h1>
        {lang === "Ru"
          ? "Самые последние предметы"
          : "Latest items on the page"}
      </h1>

      <main>
        <div className={"layout " + s.layout}>
          {list.map(({ collectionName, username, params, tag, _id }, i) => (
            <Item
              collectionName={collectionName}
              params={params}
              username={username}
              tag={tag}
              _id={_id}
              key={i}
            />
          ))}
        </div>
        <aside>
          <h2>
            {lang === "Ru"
              ? "Посмотреть коллекции по тегам"
              : "See collections by tags"}
          </h2>
          <Box>
            {tags.map((e) => (
              <Button
                variant={active === e.theme ? "contained" : "outlined"}
                onClick={() => {
                  dispatch(
                    getPagesByTheme({ page: currentPage, theme: e.theme })
                  );
                  setActive(e.theme);
                }}
              >
                {lang === "Ru" ? e.themeRu : e.theme}
              </Button>
            ))}
            <Button
              disabled={active === ""}
              onClick={() => {
                dispatch(getLastCollections(currentPage));
                setActive("");
              }}
            >
              {lang === "Ru" ? "Обнулить настройки" : "Clear Filters"}
            </Button>
          </Box>
        </aside>
      </main>
      <div className={s.pages}>
        {display.map((e, i) =>
          i <= 5 ? (
            <p
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
              }}
              className={currentPage === i + 1 ? s.active : ""}
            >
              {i + 1}
            </p>
          ) : (
            <></>
          )
        )}
        {display.length >= 6 ? (
          <>
            <p>...</p>
            <p>{display.length}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import s from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import {
  getLargestFive,
  getLastCollections,
  getPagesByTheme,
  getTags,
} from "../../../store/collections";
import Item from "./Item";
import api from "../../../shared/api";
import { Box, Button } from "@mui/material";
import Loading from "../../../shared/components/Loading";
import { ArrowRightAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const list = useAppSelector((state) => state.collections.lastCollections);
  const largest = useAppSelector(
    (state) => state.collections.largestCollections
  );
  const navigate = useNavigate();
  const tags = useAppSelector((state) => state.collections.tags);
  const loading = useAppSelector((state) => state.collections.loading);
  const [active, setActive] = useState<string>("");
  const [pages, setPages] = useState<number>(1);
  const [display, setDisplay] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.app);
  useEffect(() => {
    dispatch(getLastCollections(currentPage));
    dispatch(getTags());
    dispatch(getLargestFive());
    api.getNumberOfPages().then((res) => {
      const arr = new Array(res.pages).fill(0);
      setPages(res.pages);
      setDisplay(arr);
    });
  }, []);
  useEffect(() => {
    dispatch(getLastCollections(currentPage));
  }, [currentPage]);
  return loading ? (
    <Loading />
  ) : (
    <div className={"container " + s.root}>
      <h1>
        {active != ""
          ? lang === "Ru"
            ? "Последние предметы с тегом " + active
            : "Last items by tag " + active
          : lang === "Ru"
          ? "Самые последние предметы"
          : "Latest items on the page"}
      </h1>

      <main>
        <div className={"layout " + s.layout}>
          {list.map(
            ({ collectionName, username, params, tags, _id, itemName }, i) => (
              <Item
                itemName={itemName}
                collectionName={collectionName}
                params={params}
                username={username}
                tags={tags}
                _id={_id}
                key={_id}
              />
            )
          )}
        </div>
        <aside>
          <h2>
            {lang === "Ru"
              ? "Посмотреть предметы по тегам"
              : "See items by tags"}
          </h2>
          <Box>
            {tags.map((e, i) => (
              <Button
                sx={{ minWidth: 120 }}
                variant={active === e.tag ? "contained" : "outlined"}
                color="warning"
                onClick={() => {
                  dispatch(
                    getPagesByTheme({ page: currentPage, theme: e.tag })
                  );
                  setActive(e.tag);
                }}
                key={e.tag}
              >
                {e.tag}
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
                setActive("");
              }}
              className={currentPage === i + 1 ? s.active : ""}
            >
              {i + 1}
            </p>
          ) : (
            <React.Fragment key={i}></React.Fragment>
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
      <Box>
        <h2
          style={{
            margin: "50px 0 50px 0",
          }}
        >
          {lang === "En"
            ? "The largest 5 collections"
            : "Самые большые 5 коллекции"}
        </h2>
        <div className={s.largest}>
          {largest.map((e) => (
            <div key={e._id} className={s.large}>
              <h4>{e.collectionName}</h4>
              <p>{lang === "En" ? "by " : "от " + e.username}</p>
              <p
                className={s.link}
                onClick={() => {
                  navigate(
                    "/collection/" + e.username + "/" + e.collectionName
                  );
                }}
              >
                {lang === "En" ? "See collection " : "Посмотреть Коллекцию "}
                <ArrowRightAlt />
              </p>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Home;

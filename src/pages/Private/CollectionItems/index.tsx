import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCollectionParams } from "../../../store/collections";
import s from "./CreateItem.module.scss";
import { Box, Card, CardContent, Input, Typography } from "@mui/material";
import { getItems } from "../../../store/items";
import Toolbar from "./Toolbar";
import Loading from "../../../shared/components/Loading";
const CreateItem = () => {
  const { collection } = useParams();

  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const { itemsLoader, items } = useAppSelector((state) => state.items);
  const { lang, darkMode } = useAppSelector((state) => state.app);
  useEffect(() => {
    dispatch(getItems({ username, collectionName: collection }));
  }, []);
  useEffect(() => {
    console.log(items);
  }, [items]);
  return itemsLoader ? (
    <Loading />
  ) : (
    <div className={"container " + s.root}>
      <h1>{collection}</h1>

      {items.length === 0 ? (
        <Box sx={{ maxWidth: 420 }}>
          <p>
            {lang === "Ru" ? (
              <>
                {" "}
                Кажется тут пока пусто, добавьте в вашу коллекцию новые предметы
                и они появяться тут
              </>
            ) : (
              <>It seems that this collection is empty</>
            )}
          </p>
        </Box>
      ) : (
        <div className={s.parent}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {items.map((e, i) => (
              <Card
                sx={{
                  minWidth: 275,
                  background: darkMode ? "black" : "#fff",
                  transition: ".5s",
                  color: darkMode ? "#fff" : "black",
                  borderColor: darkMode ? "#fff" : "",
                }}
                key={i}
                color={""}
                variant="outlined"
              >
                <CardContent>
                  <h3>{e.params.name}</h3>
                  {Object.keys(e.params).map((key) =>
                    key === "name" ? (
                      <></>
                    ) : (
                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {key}: {e.params[key]}
                      </Typography>
                    )
                  )}
                  Посмотреть предмет
                </CardContent>
              </Card>
            ))}
          </Box>
          <aside>
            <Toolbar collection={collection} />
          </aside>
        </div>
      )}
    </div>
  );
};

export default CreateItem;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCollectionParams } from "../../../store/collections";
import s from "./CreateItem.module.scss";
import { Box, Input } from "@mui/material";
import { getItems } from "../../../store/items";
import Toolbar from "./Toolbar";
const CreateItem = () => {
  const { collection } = useParams();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const { itemsLoader, items } = useAppSelector((state) => state.items);
  useEffect(() => {
    dispatch(getItems({ username, collectionName: collection }));
  }, []);
  useEffect(() => {
    console.log(items);
  }, [items]);
  return itemsLoader ? (
    <>Загрузка</>
  ) : (
    <div className={"container " + s.root}>
      {items.length === 0 ? (
        <Box sx={{ maxWidth: 420 }}>
          <h1>{collection}</h1>
          <p>
            Кажется тут пока пусто, добавьте в вашу коллекцию новые предметы и
            они появяться тут
          </p>
        </Box>
      ) : (
        <Box sx={{ maxWidth: "50%" }}>
          <h1>{collection}</h1>
        </Box>
      )}
      <Toolbar />
    </div>
  );
};

export default CreateItem;

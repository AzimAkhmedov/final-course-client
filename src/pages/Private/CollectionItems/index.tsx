import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCollectionParams } from "../../../store/collections";
import s from "./CreateItem.module.scss";
import { Box, Input } from "@mui/material";
import { getItems } from "../../../store/items";

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
      <h1>{collection}</h1>

      {items.length === 0 ? (
        <Box sx={{ maxWidth: 420 }}>
          <p>
            Кажется тут пока пусто, добавьте в вашу коллекцию новые предметы и
            они появяться тут
          </p>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateItem;

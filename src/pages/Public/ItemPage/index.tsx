import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getSingleItem } from "../../../store/items";
import { Box, Typography } from "@mui/material";

const ItemPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentItem, itemsLoader } = useAppSelector((state) => state.items);
  useEffect(() => {
    console.log(params._id);

    dispatch(getSingleItem(String(params._id)));
  }, []);
  return (
    <div className="container">
      <h1>{currentItem.params.name}</h1>
      <Typography variant="subtitle1">{currentItem.collectionName}</Typography>
      <Typography variant="subtitle2">{currentItem.username}</Typography>
      <Box>
        {Object.keys(currentItem.params).map((key) => (
          <p>
            {key} : {currentItem.params[key]}
          </p>
        ))}
      </Box>
    </div>
  );
};

export default ItemPage;

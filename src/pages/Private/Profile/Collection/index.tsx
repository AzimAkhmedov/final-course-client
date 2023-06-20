import { ICollection } from "../../../../types";
import { Delete, Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import s from "./Collection.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../shared/hooks";
import { deleteCollection } from "../../../../store/collections";
const Collection = ({
  collectionName,
  params,
  username,
  description,
  _id,
}: ICollection) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className={s.root}>
      <h3>{collectionName}</h3>
      <div className={s.actions}>
        <Button
          onClick={() => {
            dispatch(deleteCollection(String(_id)));
            console.log(_id);
            
          }}
          variant="contained"
          color="warning"
        >
          <Delete />
        </Button>
        <Button
          onClick={() => {
            navigate("/profile/" + collectionName);
          }}
          variant="contained"
          color="warning"
        >
          <Add />
        </Button>
      </div>
    </div>
  );
};

export default Collection;

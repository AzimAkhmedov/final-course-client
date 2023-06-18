import { ICollection } from "../../../../types";
import { Delete, Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import s from "./Collection.module.scss";
import { useNavigate } from "react-router-dom";
const Collection = ({ collectionName, params, username }: ICollection) => {
  const navigate = useNavigate();
  return (
    <div className={s.root}>
      <h3>{collectionName}</h3>
      <div className={s.actions}>
        <Button variant="contained" color="warning">
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

import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../shared/hooks";

const Toolbar = () => {
  const params = useAppSelector(state=>state.collections.collectionParams)
  return (
    <aside>
      <div>
        <Button>Create New Item<Add/></Button>
      </div>
      <form ></form>
    </aside>
  );
};

export default Toolbar;

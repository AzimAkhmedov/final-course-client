import React from "react";
import { ICollection } from "../../../../types";
import { Box, Button } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";

const Collection = ({
  collectionName,
  params,
  username,
  description,
}: ICollection) => {
  return (
    <Box>
      <div className="collection">
        <h2>{collectionName}</h2>
        <p>Author: {username}</p>
        <p>{description}</p>
      </div>
      <Button variant="contained" color="warning">
        <ArrowRightAlt />
      </Button>
    </Box>
  );
};

export default Collection;

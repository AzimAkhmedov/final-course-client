import React from "react";
import { ICollection } from "../../../../types";

const Collection = ({
  collectionName,
  params,
  username,
  description,
}: ICollection) => {
  return (
    <div>
      <h2>{collectionName}</h2>
      <p>Author: {username}</p>
      <p>{description}</p>
    </div>
  );
};

export default Collection;

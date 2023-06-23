import React from "react";
import { useParams } from "react-router-dom";

const CollectionPage = () => {
  const params = useParams();
  return (
    <div>
      {params.username} {params.collectionName}
    </div>
  );
};

export default CollectionPage;

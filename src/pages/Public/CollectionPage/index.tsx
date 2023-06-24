import React from "react";
import { useParams } from "react-router-dom";

const CollectionPage = () => {
  const params = useParams();
  return (
    <div>
      {params.username} {params._id}
    </div>
  );
};

export default CollectionPage;

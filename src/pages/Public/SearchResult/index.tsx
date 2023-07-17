import React from "react";
import { useParams } from "react-router-dom";

const ResultPage = () => {
  const params = useParams();
  const handleGetCurrentItem = () => {};
  const handleGetCurrentCollection = () => {};
  return (
    <div className="container">
      {params.type === "item" ? (
        <></>
      ) : params.type === "comment" ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ResultPage;

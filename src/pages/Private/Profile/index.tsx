import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../shared/hooks";
import api from "../../../shared/api";

const ProfilePage = () => {
  const [collections, setCollections] = useState<any>({
    collection: [],
    username: "",
  });
  const { username } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (username != "") {
 
    }
  }, [username]);
  useEffect(() => {
    console.log(collections);
  }, [collections]);
  return (
    <div>
      <h1>Мои коллекции:</h1>
      {collections.collection.length == 0 ? (
        <>У вас нету коллекций, создайте и они появяться </>
      ) : (
        collections.collection.map((e: any) => <>{e.collectionName}</>)
      )}
    </div>
  );
};

export default ProfilePage;

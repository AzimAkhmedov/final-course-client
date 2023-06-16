import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCollections } from "../../../store/collections";
import { NavLink } from "react-router-dom";
import s from "./Profile.module.scss";
const ProfilePage = () => {
  const { collections } = useAppSelector((state) => state.collections);
  const { username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (username !== "") {
      dispatch(getCollections(username));
    }
  }, [username]);
  return (
    <div className={"container " + s.root}>
      <aside>
        <h1 className="title">Мои коллекции:</h1>
        {collections.length === 0 ? (
          <>
            У вас нету коллекций,{" "}
            <NavLink to={"/profile/createCollection"}>создайте</NavLink> и они
            появяться{" "}
          </>
        ) : (
          collections.map((e: any, i) => <h3 key={i}>{e.collectionName}</h3>)
        )}
      </aside>
      <div className={s.profile}>
        <h3>{username}</h3>
        {/* био */}
      </div>
    </div>
  );
};

export default ProfilePage;

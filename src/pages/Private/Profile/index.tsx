import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCollections } from "../../../store/collections";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./Profile.module.scss";
import Collection from "./Collection";
import { Add } from "@mui/icons-material";
const ProfilePage = () => {
  const { collections } = useAppSelector((state) => state.collections);
  const { username } = useAppSelector((state) => state.user);
  const lang = useAppSelector((state) => state.app.lang);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (username !== "") {
      dispatch(getCollections(username));
    }
  }, [username]);
  return lang === "Ru" ? (
    <div className={"container " + s.root}>
      <aside>
        <h1 className="title">Мои коллекции:</h1>
        <div className={s.collections}>
          {collections.length === 0 ? (
            <>
              У вас нету коллекций,{" "}
              <NavLink to={"/profile/createCollection"}>создайте</NavLink> и они
              появяться{" "}
            </>
          ) : (
            collections.map((e, i) => (
              <Collection
                collectionName={e.collectionName}
                params={e.params}
                username={e.username}
              />
            ))
          )}
        </div>
      </aside>
      <div className={s.profile}>
        <h3>{username}</h3>
        {collections.length === 0 ? (
          <></>
        ) : (
          <p
            onClick={() => {
              navigate("/profile/createCollection");
            }}
          >
            Создать новую коллекцию <Add />
          </p>
        )}
        {/* био */}
      </div>
    </div>
  ) : (
    <div className={"container " + s.root}>
      <aside>
        <h1 className="title">My collections:</h1>
        <div className={s.collections}>
          {collections.length === 0 ? (
            <>
              Sorry, you have no collections yet{" "}
              <NavLink to={"/profile/createCollection"}>Create thme</NavLink>{" "}
              and they will appear
            </>
          ) : (
            collections.map((e, i) => (
              <Collection
                collectionName={e.collectionName}
                params={e.params}
                username={e.username}
              />
            ))
          )}
        </div>
      </aside>
      <div className={s.profile}>
        <h3>{username}</h3>
        {collections.length === 0 ? (
          <></>
        ) : (
          <p
            onClick={() => {
              navigate("/profile/createCollection");
            }}
          >
           Create New Collection <Add />
          </p>
        )}
        {/* био */}
      </div>
    </div>
  );
};

export default ProfilePage;

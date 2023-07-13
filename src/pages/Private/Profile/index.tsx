import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getCollections } from "../../../store/collections";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./Profile.module.scss";
import Collection from "./Collection";
import { Add, ExitToApp } from "@mui/icons-material";
import { logOut } from "../../../store/user";
import { Button, Input, InputLabel, TextField } from "@mui/material";
import Loading from "../../../shared/components/Loading";
const ProfilePage = () => {
  const { collections, loading } = useAppSelector((state) => state.collections);
  const { username } = useAppSelector((state) => state.user);
  const { lang, darkMode } = useAppSelector((state) => state.app);
  // const 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (username !== "") {
      dispatch(getCollections(username));
    }
  }, [username]);
  return loading ? (
    <Loading />
  ) : lang === "Ru" ? (
    <div className={"container " + s.root}>
      <aside>
        <h1 className="title">Мои коллекции:</h1>
        <div className={s.filters}>
          <TextField
            className={darkMode ? s.darkInput : ""}
            sx={{
              border: darkMode ? "#fff 2px solid" : "",
              borderRadius: darkMode ? "5px" : "",
            }}
          />
          <Button variant="contained">Фильт по имени</Button>
          <Button variant="contained">Фильт по колличеству</Button>
        </div>
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
                key={i}
                description={e.description}
                collectionName={e.collectionName}
                params={e.params}
                imgUrl={e.imgUrl}
                username={e.username}
                _id={e._id}
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
          <Button
            onClick={() => {
              navigate("/profile/createCollection");
            }}
          >
            Создать новую коллекцию <Add />
          </Button>
        )}
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            dispatch(logOut());
            localStorage.removeItem("token");
            localStorage.removeItem("admin");

            navigate("/");
          }}
        >
          <ExitToApp />
          Выйти
        </Button>
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
                description={e.description}
                collectionName={e.collectionName}
                params={e.params}
                username={e.username}
                key={i}
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
          <Button
            onClick={() => {
              navigate("/profile/createCollection");
            }}
          >
            Create New Collection <Add />
          </Button>
        )}
        <Button
          onClick={() => {
            dispatch(logOut());
            localStorage.removeItem("token");
            navigate("/");
          }}
          color="error"
          variant="contained"
        >
          <ExitToApp />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;

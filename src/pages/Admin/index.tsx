import { Route, Routes } from "react-router-dom";
import styles from "./index.module.scss";
import SideBar from "./Sidebar";
import UsersPage from "./AllUsersPage";
import Navbar from "./Navbar";
import CollectionPage from "./CollectionsPage";
import Collection from "./Collection";
import ItemsPage from "./AllItems";
import NewCollectionPage from "./AddCollection";
import AppControl from "./AppControl";

const AdminRoutes = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.content}>
        <SideBar />
        <div style={{ width: "100%" }}>
          <Navbar />
          <div className={styles.routes}>
            <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/collections" element={<CollectionPage />} />
              <Route
                path="/collections/:collection/:username"
                element={<Collection />}
              />
              <Route path="/add" element={<NewCollectionPage />} />

              <Route path="/items" element={<ItemsPage />} />
              <Route path="/app" element={<AppControl />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;

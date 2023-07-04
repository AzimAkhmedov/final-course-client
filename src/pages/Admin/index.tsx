import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./index.module.scss";
import SideBar from "./Sidebar";
import UsersPage from "./AllUsersPage";
import Navbar from "./Navbar";

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
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;

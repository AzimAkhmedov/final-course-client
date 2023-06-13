import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./Public";
const AppRoutes = () => {
  const isAuth = true;
  const isAdmin = true;
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      {isAdmin ? <Route path="/admin/*" element={<>Admin Page</>} /> : <></>}
      {isAuth ? <Route path="/profile/*" element={<>User Page</>} /> : <></>}

    </Routes>
  );
};

export default AppRoutes;

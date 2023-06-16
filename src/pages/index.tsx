import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./Public";
import PrivateRoutes from "./Private";
const AppRoutes = () => {
  const isAuth = true;
  const isAdmin = true;
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      {isAdmin ? <Route path="/admin/*" element={<>Admin Page</>} /> : <></>}
      {isAuth ? <Route path="/profile/*" element={<PrivateRoutes />} /> : <></>}
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./Public";
import PrivateRoutes from "./Private";
import { useAppSelector } from "../shared/hooks";
import AdminRoutes from "./Admin";
const AppRoutes = () => {
  const { role, isAuth } = useAppSelector((state) => state.user);
  const isAdmin = role === "Admin";
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      {isAdmin ? <Route path="/admin/*" element={<AdminRoutes />} /> : <></>}
      {isAuth ? <Route path="/profile/*" element={<PrivateRoutes />} /> : <></>}
    </Routes>
  );
};

export default AppRoutes;

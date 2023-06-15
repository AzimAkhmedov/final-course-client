import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Profile";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default PrivateRoutes;

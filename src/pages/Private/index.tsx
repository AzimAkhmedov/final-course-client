import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Profile";
import NewCollectionPage from "./NewCollection";

const PrivateRoutes = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/createCollection" element={<NewCollectionPage />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;

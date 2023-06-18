import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Profile";
import NewCollectionPage from "./NewCollection";
import CreateItem from "./CreateItem";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/createCollection" element={<NewCollectionPage />} />
        <Route path="/:collection" element={<CreateItem />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;

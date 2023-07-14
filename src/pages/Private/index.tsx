import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Profile";
import NewCollectionPage from "./NewCollection";
import CreateItem from "./CollectionItems";
import { Header } from "../../shared/components";

const PrivateRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/createCollection" element={<NewCollectionPage />} />
        <Route path="/:collection" element={<CreateItem />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;

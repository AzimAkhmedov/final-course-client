import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Profile";
import NewCollectionPage from "./NewCollection";
import CreateItem from "./CollectionItems";
import ItemPage from "./Item";
import { Header } from "../../shared/components";

const PrivateRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/createCollection" element={<NewCollectionPage />} />
        <Route path="/:collection" element={<CreateItem />} />
        <Route path="/:collection/:_id" element={<ItemPage />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;

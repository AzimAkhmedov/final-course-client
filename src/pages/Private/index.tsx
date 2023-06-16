import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Profile";

const PrivateRoutes = () => {
  console.log('say hi');
  
  return (
    <>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;

import { useEffect } from "react";
import "./App.scss";
import AppRoutes from "./pages";
import { Header } from "./shared/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./shared/hooks";
import { getToken, isAdmin } from "./store/user";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const { darkMode } = useAppSelector((state) => state.app);
  const { username, role } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (token) {
      dispatch(getToken(token));
    }
  }, []);
  useEffect(() => {
    dispatch(isAdmin(username));
  }, [username]);

  useEffect(() => {
    if (darkMode) {
      document.body.className = "darkMode";
    } else {
      document.body.className = "";
    }
  }, [darkMode]);
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;

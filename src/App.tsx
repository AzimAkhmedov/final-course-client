import { useEffect } from "react";
import "./App.scss";
import AppRoutes from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./shared/hooks";
import { getAdminToken, getToken, isAdmin } from "./store/user";
import jwtDecode from "jwt-decode";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admin");
  const { darkMode } = useAppSelector((state) => state.app);
  const { username, role } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (token) {
      dispatch(getToken(token));
    }
    if (adminToken) {
      // @ts-ignore

      console.log(jwtDecode(adminToken).role==='Admin');

      // @ts-ignore
      if (jwtDecode(adminToken).role === "Admin") {
        dispatch(getAdminToken(adminToken));
      }
    }
    // }
  }, []);

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
      <AppRoutes />
    </div>
  );
}

export default App;

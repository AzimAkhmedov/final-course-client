import { useEffect } from "react";
import "./App.scss";
import AppRoutes from "./pages";
import { Header } from "./shared/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./shared/hooks";
import { getToken } from "./store/user";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(getToken(token));
    }
  }, []);
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

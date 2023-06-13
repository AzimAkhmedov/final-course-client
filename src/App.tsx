import React from "react";
import "./App.scss";
import AppRoutes from "./pages";
import { Header } from "./shared/components";

function App() {
  return (
    <div className="App">
      
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;

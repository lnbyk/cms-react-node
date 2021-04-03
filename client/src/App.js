import React from "react";
import Particle from "./components/Particles";
import 'antd/dist/antd.css'
import logo from "./logo.svg";
import "./App.css";
import AuthPage from "./pages/user/login/AuthPage";

const App = () => {
  return (
    <div>
      <Particle />
      <AuthPage />
    </div>
  );
};

export default App;

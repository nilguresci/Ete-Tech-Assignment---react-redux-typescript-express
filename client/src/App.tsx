import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Company from "./pages/Company";
import HeaderComponent from "./components/Header";
import { useSelector } from "react-redux";
import { Divider, Layout, theme, Tabs } from "antd";
import type { TabsProps } from "antd";
import { IUserInitialInfo } from "./models/User";
const { Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const loggedInUser: IUserInitialInfo = useSelector(
    (state: any) => state.auth.user
  );

  useEffect(() => {
    return () => {};
  }, [loggedInUser]);

  return (
    <div>
      <Router>
        {loggedInUser ? (
          <Layout>
            <div
              style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
            >
              <HeaderComponent></HeaderComponent>
            </div>
          </Layout>
        ) : (
          <div></div>
        )}

        <div className="main">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/company" element={<Company />}></Route>
          </Routes>
        </div>

        <ToastContainer />
        {loggedInUser ? (
          <Layout>
            <Footer style={{ textAlign: "center" }}>
              ETE TECHNOLOGY ©2023
            </Footer>
          </Layout>
        ) : (
          <div></div>
        )}
      </Router>
    </div>
  );
}

export default App;

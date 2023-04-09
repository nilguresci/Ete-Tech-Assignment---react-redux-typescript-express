import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { logout, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaThList, FaRegListAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [current, setCurrent] = useState("logo");
  useEffect(() => {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    setCurrent(page ? page : "logo");
  }, []);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: <a href="/">ETE TECHNOLOGY</a>,
      key: "logo",
      //icon: <MailOutlined />,
    },
    {
      label: <a href="/product">Products</a>,
      key: "mail",
      icon: <FaThList />,
    },
    {
      label: <a href="/company">Companies</a>,
      key: "SubMenu",
      icon: <FaRegListAlt />,
    },
    {
      label: (
        <Button className="logoutBtn" type="link" onClick={onLogout}>
          Logout
        </Button>
      ),
      key: "logout",
    },
  ];

  const onClick: MenuProps["onClick"] = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "logout") {
      onLogout();
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;

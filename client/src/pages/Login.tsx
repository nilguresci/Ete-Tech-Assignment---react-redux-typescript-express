import { FaSignInAlt } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { Button, Checkbox, Form, Input } from "antd";
import { IUser, IUserInitialInfo } from "../models/User";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const onFinish = (values: any) => {
    const userData: IUser = {
      username: values.username,
      password: values.password,
    };

    const userInitialInfoData: IUserInitialInfo = {
      user: userData,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: "",
    };

    dispatch(login(userInitialInfoData));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const newObj: IUserInitialInfo = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (newObj.isError) {
      toast.error(newObj.message);
    }

    if (newObj.isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [
    newObj.user,
    newObj.isError,
    newObj.isSuccess,
    newObj.message,
    navigate,
    dispatch,
  ]);

  return (
    <div>
      <section className="heading">
        <div className="loginHeader">
          <h1 className="loginIcon">
            <AiOutlineLogin></AiOutlineLogin>
          </h1>
          <h1 className="loginText">Login</h1>
        </div>
      </section>
      <section>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>{" "}
            <p>
              or <a href="/register">register now!</a>
            </p>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Login;

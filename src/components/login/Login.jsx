import React from "react";
import "./index.scss";
import { Button, Checkbox, Flex, Form, Input } from "antd";

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <div className="login__form">
        <h1>Login Form</h1>
        <div className="login__form__wrap">
          <div className="login__form__wrap--buttonGG">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
              alt=""
            />
            <span>Login with google</span>
          </div>
          <div className="login__form__wrap--Form">
            <Form
              name="basic"
              style={{
                width: "100%",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{
                  span: 24,
                }}
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="login__form__wrap--Form--Pass">
                <a href="">Forgot password</a>
                <Form.Item
                  labelCol={{
                    span: 24,
                  }}
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  style={{
                    width: "100%",
                    background: "black",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
              <a href="/Register">Register now!</a>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

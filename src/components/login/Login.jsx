import React from "react";
import "./index.scss";
import { Button, Form, Input } from "antd";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, ggProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const response = await api.post("login", values);
      toast.success("Success");
      dispatch(login(response.data));
      const { role, token } = response.data;
      localStorage.setItem("token", token);

      if (role === "ADMIN") {
        navigate("/Dashboard");
      }
      if (role === "USER") {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  const handleLoginGoogle = () => {
    signInWithPopup(auth, ggProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Login Form</h1>
        <div className="login__form__wrap">
          <div
            className="login__form__wrap--buttonGG"
            onClick={handleLoginGoogle}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
            />
            <span>Login with Google</span>
          </div>
          <div className="login__form__wrap--Form">
            <Form
              name="basic"
              style={{
                width: "100%",
              }}
              onFinish={handleLogin}
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
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: "Username must be alphanumeric!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <div className="login__form__wrap--Form--Pass">
                <a href="">Forgot password?</a>
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
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
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

import React from "react";
import "./index.scss";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";

function Register() {
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      const response = await api.post("register", values);
      console.log(response);
      if (role === "USER") {
        navigate("/HomePage");
      }
     
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Register Form</h1>
        <div className="login__form__wrap">
          <div className="login__form__wrap--Form">
            <Form
              name="basic"
              style={{
                width: "100%",
              }}
              onFinish={handleRegister}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* Username */}
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

              {/* Email with validation */}
              <Form.Item
                labelCol={{
                  span: 24,
                }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Phone Number with validation */}
              <Form.Item
                labelCol={{
                  span: 24,
                }}
                label="Phone Number"
                name="phonenumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^\d{10}$/, // Adjust to your desired format
                    message: "Please input a valid phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Password */}
              <div className="login__form__wrap--Form--Pass">
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

              {/* Confirm Password with validation */}
              <div className="login__form__wrap--Form--Pass">
                <Form.Item
                  labelCol={{
                    span: 24,
                  }}
                  label="Confirm Password"
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords that you entered do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>

              {/* Submit Button */}
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

              {/* Back to Login Link */}
              <a href="/">Back to Login!</a>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

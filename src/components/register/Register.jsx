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
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
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
              style={{ width: "100%" }}
              onFinish={handleRegister}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* Username */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  { min: 3, message: "Username must be at least 3 characters." },
                  { max: 15, message: "Username cannot exceed 15 characters." },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Email with validation */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "The input is not a valid email!" },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Address */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please input your address!" }]}
              >
                <Input />
              </Form.Item>

              {/* Phone Number */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone number!" },
                  {
                    pattern: /^\d{10}$/,
                    message: "Phone number must be exactly 10 digits!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Password */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters." },
                  {
                    pattern: /^[A-Za-z0-9]+$/, // Only letters and numbers allowed
                    message: "Password must contain only letters and numbers, no special characters!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                labelCol={{ span: 24 }}
                label="Confirm Password"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The two passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  style={{ width: "100%", background: "black" }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>

              {/* Back to Login Link */}
              <a href="/login">Back to Login!</a>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

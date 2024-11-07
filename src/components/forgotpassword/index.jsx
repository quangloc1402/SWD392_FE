// ForgotPassword.js
import React, { useState } from 'react';
import api from "../../config/axios"; 
import { Form, Input, Button, Typography, message as antMessage } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import "./index.scss";

const { Title, Text } = Typography;

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      
      const response = await api.post('/forgot-password', { email });
      
      if (response.status === 200) {
        antMessage.success('A password reset link has been sent to your email.');
      } else {
        antMessage.error('Failed to send reset link. Please try again later.');
      }
    } catch (error) {
    
      if (error.response && error.response.data) {
        antMessage.error('Email not found. Please check and try again.');
      } else {
        antMessage.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <Title level={2}>Forgot Password</Title>
      <Form
        name="forgotPassword"
        onFinish={handleSubmit}
        layout="vertical"
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Form.Item>
      </Form>
      <Text type="secondary">
        Enter your email address and we'll send you an email have link to reset your password.
      </Text>
    </div>
  );
}

export default ForgotPassword;

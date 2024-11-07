// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Typography, message as antMessage } from 'antd';
import './index.scss';

const { Title } = Typography;

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      antMessage.error('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      // API endpoint for password reset
      const response = await axios.post('/api/reset-password', { token, password });
      
      if (response.data.success) {
        antMessage.success('Password has been successfully reset.');
      } else {
        antMessage.error('Failed to reset password. Please try again.');
      }
    } catch (error) {
      antMessage.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <Title level={2}>Reset Password</Title>
      <Form
        name="resetPassword"
        onFinish={handleSubmit}
        layout="vertical"
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your new password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm your new password!' },
          ]}
        >
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ResetPassword;

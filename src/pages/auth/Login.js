import React from 'react';
import 'antd/dist/antd.css';
import "../../index.css";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { _login } from '../../service/AuthService';

export default function Login({ setIsAuthenticated, setAdmin }) {

  async function onLoginFormFinish({ username, password, remember }) {
    const response = await _login({ username, password })
    const { isAdmin, isValid, user, token } = response;

    if (!response.successful || !isValid) { // Not Successful
      setIsAuthenticated(false);
      return;
    }
    
    if (remember) {
      localStorage.setItem('Authorization', token);
      localStorage.setItem('Username', user.username);
    }
    
    sessionStorage.setItem('Authorization', token);
    sessionStorage.setItem('Username', user.username);
    
    setAdmin(isAdmin);
    setIsAuthenticated(true);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onLoginFormFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          id='username'
          name='username'
          placeholder="Username"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          id='password'
          name='password'
          type="password"
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit" className="login-form-button"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
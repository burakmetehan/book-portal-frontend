import React from 'react';
import 'antd/dist/antd.css';
import "../../index.css";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { _login } from '../../service/AuthService';

export default function Login({ setIsAuthenticated }) {

  async function onLoginFormFinish({ username, password, remember }) {
    const responseData = await _login({ username, password })

    if (!responseData.successful) { // Not Successful
      setIsAuthenticated(false);
      return;
    }

    const { user } = responseData;
    const { token } = responseData;

    console.log(remember);

    if (remember) {
      localStorage.setItem('Authorization', token);
      localStorage.setItem('Username', user.username);
    }

    sessionStorage.setItem('Authorization', token);
    sessionStorage.setItem('Username', user.username);

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

        <Button
          className="login-form-forgot"
          type='link'
        >
          Forget password
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit" className="login-form-button"
        >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Test from "./test.js";
import Test2 from "./test2.js";

const NormalLoginForm = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
    Test({ values });
  };

  const reqFinish = values => {
    Test2({ values });
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>

      <Form
        name="req"
        className="normal-login"
        onFinish={reqFinish}
      >
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Send Req to Users
        </Button>
      </Form.Item>
      </Form>
    </>
  );
};

ReactDOM.render(<NormalLoginForm />, document.getElementById('root'));

export default NormalLoginForm;

import React, { useState } from "react";
import "antd/dist/antd.css";

import { _addUser } from "../../service/UserService";

import {
  Form,
  Input,
  InputNumber,
  Radio,
} from "antd";

import { Button, Checkbox } from 'antd';

export default function AddUser() {

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [userData, setUserData] = useState(
    {
      username: "",
      password: ""
    }
  );

  async function onFinish() {
    const data = await _addUser(userData);

    if (data !== false) {
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function onUserDataChange(event) {
    const { name, value } = event.target;

    setUserData((prevUserData) => (
      {
        ...prevUserData,
        [name]: value
      }
    ));
  }

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input
            id="username"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={onUserDataChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            id="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={onUserDataChange}
          />
        </Form.Item>

        {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {
        isSuccessful &&
        <h1>{userData.username} is created</h1>
      }
    </div>
  );
}
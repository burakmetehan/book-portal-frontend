import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

import { _addUser } from "../../service/UserService";

export default function AddUser() {

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });

  /* ========== Event Listener Functions ========== */
  async function onFinish() {
    const data = await _addUser(userData);

    if (data.successful) {
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
    }
  }

  function onFinishFailed() {
    window.alert("Error in Add User")
  }

  function onUserDataChange(event) {
    const { name, value } = event.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  }

  /* ========== Return ========== */
  return (
    <div className="add-user">
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{
            required: true,
            message: 'Please input your username!'
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
          rules={[{
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
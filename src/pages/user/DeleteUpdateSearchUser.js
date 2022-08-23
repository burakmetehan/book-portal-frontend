import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Col, Row } from "antd";

import UserShow from './UserShow';
import UserContentParser from './UserContentParser';

import {
  _deleteUser,
  _searchAllUsers, _searchUserById, _searchUserByName,
  _updateUser
} from '../../service/UserService';

export default function DeleteUpdateSearchUser() {
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState([{
    key: 0,
    username: "",
    readList: null,
    favoriteList: null,
    roles: null,
  }]);

  /* ========== Use Effect Function ========== */
  useEffect(() => {
    async function searchAllUsers() {
      const data = await _searchAllUsers({
        pageSize: 10,
        pageNumber: 0
      });

      const newContent = UserContentParser(data);

      setUserData(newContent);
    }

    searchAllUsers();
  }, [userId != null, username !== ""])


  /* ========== Event Listener Functions ========== */
  function onUserIdChange(newId) {
    setUserId(newId);
  }

  function onUsernameChange(event) {
    setUsername(event.target.value);
  }

  async function onUserSearchById() {
    if (userId < 0) {
      window.alert("Check Book Id. Book Id should be greater than or equal 0!")
      return;
    }

    const data = await _searchUserById({ userId });

    if (!data.successful) { // Not Found
      setUserData([]);
      return;
    }

    // User is found
    const newContent = UserContentParser(data);

    setUserData(newContent);
  }

  async function onUserSearchByName() {
    if (username === "" || username == null) {
      window.alert("Check Book Name. Username should bve provided!")
      return;
    }

    const data = await _searchUserByName({ username });

    if (!data.successful) { // Not Found
      setUserData([]);
      return;
    }

    // User(s) is found
    const newContent = UserContentParser(data);

    setUserData(newContent);
  }

  /* ========== Handle Functions ========== */
  async function handleDelete(key) {
    const data = await _deleteUser({ userId: key });

    if (!data.successful) { // Error
      window.alert("User is not Found")
      return;
    }

    // Delete is successful
    const newUserData = userData.filter((item) => item.key !== key);

    setUserData(newUserData);
  }

  async function handleUpdate(key, password) {
    const data = await _updateUser({ userId: key, password: password })

    if (!data.successful) { // Unsuccessful request
      window.alert("Error");
      return;
    }

    // Update is successful
    setUserData(userData);
  }

  /* ========== Return ========== */
  return (
    <>
      <div className='search-forms'>
        <Row>
          <Col span={12}>
            <Form
              onFinish={onUserSearchById}
              onFinishFailed={() => console.log("Failed in Search User By Id!")}
            >
              <Form.Item
                label="Search User By Id"
                rules={[{ message: 'Please input an integer greater than or equal to 0!' }]}
              >
                <InputNumber
                  min={0}
                  id="userId"
                  name="userId"
                  value={userId}
                  onChange={onUserIdChange}
                />

                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              onFinish={onUserSearchByName}
              onFinishFailed={() => console.log("Failed in Search User By Name!")}
            >
              <Form.Item
                label="Search User By Name"
                rules={[{ message: 'Please input username' }]}
              >
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={onUsernameChange}
                />

                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <div className='user-show'>
        <h1>Users</h1>
        <UserShow
          users={userData}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

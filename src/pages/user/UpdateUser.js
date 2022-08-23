import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';

import { _searchAll, _deleteUser, _searchById, _searchByName } from '../../service/UserService';

import UserCollapse from './UserCollapse';
import UserShow from './UserShow';

const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    username: `Edrward ${i}`,
    password: `London Park no. ${i}`,
  });
}

export default function UpdateUser() {
  const [userData, setUserData] = useState([
    {
      key: 0,
      username: "",
      readList: null,
      favoriteList: null,
      roles: null,
    }
  ]);

  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function searchAllUsers() {
      const data = await _searchAll({
        pageSize: 10,
        pageNumber: 0
      });

      const newContent = parseResponse(data);

      setUserData(newContent);
    }

    searchAllUsers();
  }, [userId != null, username !== ""])

  async function handleDelete(key) {
    // make DB call by key
    const data = await _deleteUser({ userId: key });

    if (data.name == "AxiosError") { // Error
      window.alert("User is not Found")
      return;
    }

    // Deleted
    // Can be changed later according to return object
    const newUserData = userData.filter((item) => item.key !== key);
    setUserData(newUserData);
  };

  async function onSearch() {
    if (userId < 0) {
      // Make this part inside input by using min and message
      window.alert("Book Name should be greater than or equal 0")
      return;
    }

    const data = await _searchById({ userId });

    if (data.empty) { // Not Found
      setUserData([]);
      return;
    }

    // Found
    // Can be changed later according to return object
    const newContent = parseResponse(data);

    setUserData(newContent);
  }

  function onUserIdChange(newId) {
    setUserId(newId);
  }

  async function onSearchName() {
    if (username === "" || username == null) {
      window.alert("Username is not right")
      return;
    }

    const data = await _searchByName({ username });

    if (data.empty) { // Not Found
      setUserData([]);
      return;
    }

    // Found
    // Can be changed later according to return object
    const newContent = parseResponse(data);

    setUserData(newContent);
  }

  function onUsernameChange(event) {
    const { value } = event.target;
    setUsername(value);
  }

  function handleEdit() {

  }

  return (
    <div>
      <Form
        onFinish={onSearch}>
        <Form.Item
          label="Search By Id"
          name="userId"
        >
          <InputNumber
            min={0}
            id="userId"
            name="userId"
            value={userId}
            onChange={onUserIdChange}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>

      <Form
        onFinish={onSearchName}>
        <Form.Item
          label="Search By Name"
          name="username"
        >
          <Input
            id="username"
            name="username"
            value={username}
            onChange={onUsernameChange}
          >
          </Input>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>

      <br />
      <UserShow users={userData} handleDelete={handleDelete} />
    </div>
  );
};

function parseResponse(data) {
  const newContent = data.content.map((user) => {
    let readList = user.readList;
    let favoriteList = user.favoriteList;

    readList = readList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    favoriteList = favoriteList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    return {
      ...user,
      key: user.id,
      readList: readList,
      favoriteList: favoriteList
    }
  });

  return newContent;
}
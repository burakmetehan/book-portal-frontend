import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";

import { _searchAll, _deleteUser, _searchById, _searchByName } from '../../service/UserService';

import { Form, Input, InputNumber, Button, Popconfirm, Table, Collapse, Switch, Tree} from "antd";

import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";

const treeData = [
  {
    title: "Read List",
    key: "0-0",
    icon: <CarryOutOutlined />,
    children: [
      {
        title: "Crime and Punishment",
        key: "0-0-0",
        icon: <CarryOutOutlined />
      },
      {
        title: "Dune",
        key: "0-0-1",
        icon: <CarryOutOutlined />,
      }
    ]
  },
  {
    title: "Favorite List",
    key: "0-1",
    icon: <CarryOutOutlined />,
    children: [
      {
        title: "Dune",
        key: "0-1-0",
        icon: <CarryOutOutlined />
      }
    ]
  },
  {
    title: "Roles",
    key: "0-2",
    icon: <CarryOutOutlined />,
    children: [
      {
        title: "ROLE_USER",
        key: "0-2-0",
        icon: <CarryOutOutlined />
      }
    ]
  }
];

const { Panel } = Collapse;
const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

export default function DeleteUser() {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Read List',
      dataIndex: 'readList',
    },
    {
      title: 'Favorite List',
      dataIndex: 'favoriteList',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        userData.length >= 1 ? (
          <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.key, record)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

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

  /* useEffect(() => {
    async function searchAll() {
      const data = await _searchAll({
        pageSize: 10,
        pageNumber: 0
      });

      const newContent = data.content.map((user) => {
        return (
          {
            ...user,
            key: user.id
          }
        );
      });

      console.log(userData);
      setUserData(newContent);
    };

    searchAll();

  }, [userId != null, username !== ""]); */



  async function handleDelete(key) {
    // make DB call by key
    const data = await _deleteUser({ userId: key });

    console.log(data);

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
      window.alert("Book Id should be greater than or equal 0")
      return;
    }

    const data = await _searchById({ userId });

    if (data.empty) { // Not Found
      setUserData([]);
      return;
    }

    // Found
    // Can be changed later according to return object
    const newContent = data.content.map((user) => {
      return (
        {
          ...user,
          key: user.id
        }
      );
    });

    setUserData(newContent);
  }

  function onUserIdChange(newId) {
    console.log(newId);
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
    const newContent = data.content.map((user) => {
      return (
        {
          ...user,
          key: user.id
        }
      );
    });

    setUserData(newContent);
  }

  function onUsernameChange(event) {
    const { value } = event.target;
    setUsername(value);
  }

  const onChange = (key) => {
    console.log(key);
  };

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

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

      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
          <Tree
            showLine={true}
            showIcon={false}
            defaultExpandedKeys={["0-0-0"]}
            onSelect={onSelect}
            treeData={treeData}
          />
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  );
};

// @TODO
// Add name search and show the result in table. When a book is chosen show the summary of the book.


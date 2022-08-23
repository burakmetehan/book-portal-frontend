import React, { useState } from "react";
import { Table, Collapse, Button, Space, Form, Input, Popconfirm } from "antd";

const { Panel } = Collapse;

export default function UserCollapse({ user, handleDelete, handleUpdate }) {

  const [isUpdateUser, setIsUpdateUser] = useState(false);

  function onFinish({ password }) {
    handleUpdate(user.key, password);
    setIsUpdateUser(false);
    window.alert("User is updated");
  };

  return (
    <Collapse>
      <Panel header={`${user.username}`} key={user.key}>
        <p>This is the data of {user.username}.</p>
        <Collapse ghost>
          <Panel header="Read List" key="readList">
            <Table
              bordered
              columns={bookColumns}
              dataSource={user.readList}
            />
          </Panel>
          <Panel header="Favorite List" key="favoriteList">
            <Table
              bordered
              columns={bookColumns}
              dataSource={user.favoriteList}
            />
          </Panel>
          <Panel header="Roles" key="roles">
            {
              user.roles &&
              <ul>
                {
                  user.roles.map((item) => {
                    return <li key={item.id}>{item.name}</li>
                  })
                }
              </ul>
            }
          </Panel>
        </Collapse>

        <Space>
          <Popconfirm
            title="Are you sure to delete the user?"
            onConfirm={() => handleDelete(user.key)}
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              Delete User
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setIsUpdateUser(!isUpdateUser)}
          >
            {isUpdateUser ? 'Close' : 'Update User'}
          </Button>
        </Space>

        {isUpdateUser && <UserEditForm onFinish={onFinish} />}
      </Panel>
    </Collapse>
  );
}

const bookColumns = [
  {
    title: 'Book Name',
    dataIndex: 'name',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Page Count',
    dataIndex: 'pageCount',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
  },
  {
    title: 'Publication Date',
    dataIndex: 'publicationDate',
  }
];

function UserEditForm({ onFinish }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="updateUser"
      onFinish={onFinish}
      onFinishFailed={() => console.log("Fail")}
    >
      <Form.Item
        name="password"
        label="Password"
        rules={[{
          required: true,
          message: "Please input your password!"
        }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
}

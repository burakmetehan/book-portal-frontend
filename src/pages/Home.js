import React, { useEffect, useState } from "react";

import { Button, Breadcrumb, Layout, Card, Descriptions, Collapse, Table, Form, Input, Popconfirm } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { _searchUserByName2, _updateUser } from "../service/UserService";
import DescriptionsItem from "antd/lib/descriptions/Item";
import FormItem from "antd/es/form/FormItem";

const { Content } = Layout;
const { Panel } = Collapse;

export default function Home({ setIsAuthenticated }) {
  return (
    <Layout
      style={{
        padding: '0 24px 24px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <HomeContent setIsAuthenticated={setIsAuthenticated} />
    </Layout>
  );
}

function HomeContent({ setIsAuthenticated }) {
  const [userData, setUserData] = useState({});
  const [isChangePassword, setIsChangePassword] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const userData = await _searchUserByName2({ username: localStorage.getItem('Username') });

      if (!userData.successful) {
        localStorage.clear();
        sessionStorage.clear();
        setIsAuthenticated(false);
        return;
      }

      setUserData(userData);
    }

    getUserData();
  }, [])

  async function passwordChange({ newPassword }) {
    const responseData = await _updateUser({ userId: userData.id, newPassword });

    if (!responseData.successful) { // Not successful

    }

    setUserData(userData);

    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
  }

  function onUserUpdateFormFinish({ password }) {
    console.log("Hi")
    console.log(password);

    setIsChangePassword(false);
    window.alert("Password is changed!");
    passwordChange(password);
  };

  function HomeAvatar() {
    return (
      <div className="home-avatar">
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          size="large"
          icon={<UserOutlined />}
        />
        Hello <b>{localStorage.getItem('Username')}</b>
      </div>
    );
  }

  function HomeInfo() {
    return (
      <Card
        title="User Info"
        bordered={false}
      >
        <Descriptions
          bordered
        >
          <DescriptionsItem label="User Id">{userData.id || null}</DescriptionsItem>
        </Descriptions>

        <Collapse ghost>
          <Panel header="Read List" key="readList">
            <Table
              bordered
              columns={bookColumns}
              dataSource={userData.readList}
            />
          </Panel>
          <Panel header="Favorite List" key="favoriteList">
            <Table
              bordered
              columns={bookColumns}
              dataSource={userData.favoriteList}
            />
          </Panel>
          <Panel header="Roles" key="roles">
            {
              userData.roles &&
              <ul>
                {
                  userData.roles.map((item) => {
                    return <li key={item.id}>{item.name}</li>
                  })
                }
              </ul>
            }
          </Panel>
        </Collapse>

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setIsChangePassword(!isChangePassword)}
        >
          {isChangePassword ? 'Cancel' : 'Change Password'}
        </Button>

        {
          isChangePassword && <UserUpdateForm onFinish={onUserUpdateFormFinish} />
        }
      </Card>

    );

  }

  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >

      <HomeAvatar />

      <HomeInfo />

    </Content>
  );
}

function UserUpdateForm({ onFinish }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="updateUser"
      onFinish={onFinish}
      onFinishFailed={() => console.log("Fail")}
    >
      <Form.Item>
        <b>Warning:</b> When password is changed, you will be logged out!
      </Form.Item>
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
          Confirm Password Change
        </Button>
      </Form.Item>

    </Form >
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
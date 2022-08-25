import React, { useEffect, useState } from "react";

import {
  Alert, Avatar, Button, Breadcrumb, Card, Collapse,
  Descriptions, Form, Input, Layout, message, notification, Table
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { _searchUserByUsername, _updateUser } from "../service/UserService";

import BOOK_COLUMNS from "../global-vars/BookColumns";

const { Content } = Layout;
const { Panel } = Collapse;

export default function Home({ setIsAuthenticated, setHeaderKey }) {
  setHeaderKey('home');

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

  /* ========== Use Effect ========== */
  useEffect(() => {
    async function getUserData() {
      const userData = await _searchUserByUsername({
        username: sessionStorage.getItem('Username')
      });

      if (!userData.successful) { // Not successful
        localStorage.clear();
        sessionStorage.clear();

        setIsAuthenticated(false);

        return;
      }

      setUserData(userData);
    }

    getUserData();
  }, [])

  /* ========== Password Change ========== */
  async function passwordChange({ password }) {
    const responseData = await _updateUser({ userId: userData.id, newPassword: password });

    if (!responseData.successful) { // Not successful
      const config = {
        description: 'Password Change Error!',
        duration: 4.5,
        key: 'password-change-error',
        message: 'An error happened in password change! Please log in and try again!',
        placement: 'top'
      }

      notification.error(config);
    } else {
      const config = {
        description: 'Your password is changed successfully!',
        duration: 4.5,
        key: 'password-change-success',
        message: 'Password is changed!',
        placement: 'top'
      }

      notification.success(config);
    }

    setUserData(userData);

    localStorage.clear();
    sessionStorage.clear();

    setIsAuthenticated(false);
  }

  function onUserUpdateFormFinish({ password }) {
    passwordChange({ password });
    setIsChangePassword(false);
  };

  function onClickPasswordChangeButton() {
    setIsChangePassword(!isChangePassword);
  }

  /* ========== Info Part ========== */
  function HomeInfo() {
    return (
      <Card
        title={<HomeAvatar />}
        bordered={false}
      >
        <Descriptions
          bordered
        >
          <Descriptions.Item label="User Id">{userData.id || null}</Descriptions.Item>
        </Descriptions>

        <Collapse ghost>
          <Panel header="Read List" key="readList">
            <Table
              bordered
              columns={BOOK_COLUMNS}
              dataSource={userData.readList}
            />
          </Panel>
          <Panel header="Favorite List" key="favoriteList">
            <Table
              bordered
              columns={BOOK_COLUMNS}
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
          onClick={onClickPasswordChangeButton}
        >
          {isChangePassword ? 'Cancel' : 'Change Password'}
        </Button>

        {
          isChangePassword && <UserUpdateForm onUserUpdateFormFinish={onUserUpdateFormFinish} />
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
      <HomeInfo />
    </Content>
  );
}

function UserUpdateForm({ onUserUpdateFormFinish }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="updateUser"
      onFinish={onUserUpdateFormFinish}
      onFinishFailed={() => console.log("Fail")}
    >
      <Form.Item>
        <Alert
          message="Warning"
          description="When password is changed, you will be logged out!"
          type="warning"
          showIcon
          closable
        />
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
      Hello <b>{sessionStorage.getItem('Username')}</b>
    </div>
  );
}
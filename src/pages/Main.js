import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { _checkAuth } from '../service/AuthService';
import Home from './Home';

import AddBook from './book/BookDescription';

const { Header, Content, Sider } = Layout;

// Sider items
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});


export default function Main({ setIsAuthenticated }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout
        style={{ height: '100vh' }}
      >
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="users">
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="books">
              <Link to="/books">Books</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
            <Breadcrumb.Item>Books</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Switch>
              <Route path="/">
                <Home setIsAuthenticated={setIsAuthenticated} />
              </Route>
              <Route path="users">
                <h1>USERS</h1>
              </Route>
              <Route path="books">
                <AddBook />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router >
  );
}

/*
return (
    <Router>
      <Layout
        style={{ minHeight: '100vh' }}
      >
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="users">
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="books">
              <Link to="/books">Books</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items2}
            />
          </Sider>

          <Switch>
            <Route path="/">
              <Home setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <Route path="users">
              <h1>USERS</h1>
            </Route>
            <Route path="books">
              <AddBook />
            </Route>
          </Switch>

        </Layout>
      </Layout>
    </Router>
  );
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Main from "./pages/Main"
import { _checkAuth, _login } from "./service/AuthService";

import 'antd/dist/antd.css';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './pages/Home';

import AddBook from './pages/book/AddBook';

const { Header, Content, Footer } = Layout;

axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = localStorage.getItem('Authorization');
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


/* export default function App() {
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
          >
            <Menu.Item key='home'>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key={'books'}>
              <Link to="/books">Books</Link>
            </Menu.Item>
            <Menu.Item key='users'>
              <Link to="/users">Users</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </Layout>
    </Router >
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Books() {
  return <h2>Books</h2>;
}

function Users() {
  return <h2>Users</h2>;
} */

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const responseData = await _checkAuth();

      if (responseData.valid && responseData.token) {
        localStorage.setItem('Authorization', 'Bearer ' + responseData.token);
        setIsAuthenticated(true);
      } else {
        localStorage.clear();
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, [])

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
              <Route exact path="/">
                <Home setIsAuthenticated={setIsAuthenticated} />
              </Route>
              <Route path="/users">
                <User />
              </Route>
              <Route path="/books">
                <AddBook />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router >
  )
}

function Book() {
  return <h1>Books</h1>
}

function User() {
  return <h1>USERS</h1>
}

/*
return (
    <>
      {
        isAuthenticated ? <Main setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />
      }
    </>
  )
  */
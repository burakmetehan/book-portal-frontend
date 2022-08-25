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
import User from "./pages/user/User";
import Book from "./pages/book/Book";

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

const { Header, Content, Footer, Sider } = Layout;

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

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [headerKey, setHeaderKey] = useState('');
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
    <>{ isAuthenticated ? 
    <Router>
      <Layout
        style={{ height: '100vh' }}
      >
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[headerKey]}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="user">
              <Link to="/user">User</Link>
            </Menu.Item>
            <Menu.Item key="book">
              <Link to="/book">Book</Link>
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

          <Content
            className="site-layout"
          >
            <Switch>
              <Route exact path="/">
                <Home setIsAuthenticated={setIsAuthenticated} setHeaderKey={setHeaderKey} />
              </Route>
              <Route path="/user">
                <User setHeaderKey={setHeaderKey} />
              </Route>
              <Route path="/book">
                <Book setHeaderKey={setHeaderKey} />
              </Route>
            </Switch>
          </Content>
        </Layout>


      </Layout>
    </Router >
  : <Login setIsAuthenticated={setIsAuthenticated} />}</>)

  /*  return (
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
             <Breadcrumb.Item>List</Breadcrumb.Item>
             <Breadcrumb.Item>App</Breadcrumb.Item>
           </Breadcrumb>
           <Content
             className="site-layout-background"
             style={{
               padding: 24,
               margin: 0,
               minHeight: 280,
             }}
           >
 
             <Switch>
               <Route exact path="/">
                 <Home setIsAuthenticated={setIsAuthenticated} />
               </Route>
               <Route path="/users">
                 <User />
               </Route>
               <Route path="/books">
                 <Book />
               </Route>
             </Switch>
           </Content>
         </Layout>
       </Layout>
     </Layout>); */
}

/* function Book() {
  return <h1>Books</h1>
} */

/* function User() {
  return <h1>USERS</h1>
} */

/*
return (
    <>
      {
        isAuthenticated ? <Main setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />
      }
    </>
  )
  */
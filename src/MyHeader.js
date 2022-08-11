import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Books from "./pages/Books";
import Admin from "./pages/Admin";

const { Header, Content, Footer } = Layout;

class MyHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (localStorage.getItem('isAdmin')) {
      return adminRouter;
    } else {
      return userRouter;
    }
  }
}

const userHeader =
  <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        {" "}
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Link to="/books">Books</Link>
      </Menu.Item>
    </Menu>
  </Header>

const adminHeader =
  <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        {" "}
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Link to="/books">Books</Link>
      </Menu.Item>
      <Menu.Item key="4">
        {" "}
        <Link to="/admin">Admin</Link>
      </Menu.Item>
    </Menu>
  </Header>

const userRouter =
  <Router>
    <Layout style={{ height: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            {" "}
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            {" "}
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            {" "}
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
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Router>

const adminRouter =
  <Router>
    <Layout style={{ height: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            {" "}
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            {" "}
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            {" "}
            <Link to="/books">Books</Link>
          </Menu.Item>
          <Menu.Item key="4">
            {" "}
            <Link to="/admin">Admin</Link>
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
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Router>

export default MyHeader;
/*

<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              {" "}
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              {" "}
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="3">
              {" "}
              <Link to="/books">Books</Link>
            </Menu.Item>
            {
              localStorage.getItem('isAdmin') ?
                <Menu.Item key="4">
                  {" "}
                  <Link to="/admin">Admin</Link>
                </Menu.Item> : ""
            }
          </Menu>
        </Header>
        
        */
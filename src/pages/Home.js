import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeService from "../service/HomeService";

const Home = () => {
  const [credentials, setCredentials] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('Authorization')) {
      setAuthenticated(true);
    }

    if (localStorage.getItem('isAdmin')) {
      setIsAdmin(true);
    }
  })
  const onFinish = async values => {
    var flag = await HomeService({ values });
    if (flag) {
      setAuthenticated(true);
      setIsAdmin(localStorage.getItem('isAdmin'));
      console.log("Success");
    } else {
      setAuthenticated(false);
      setIsAdmin(false);
      console.log("Fail");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  let ret;

  if (authenticated) {
    if (isAdmin) {
      
      ret =
        <>
          <h1>Hello {localStorage.getItem('username')}</h1>

          <Form
            name="basic"
            onFinish={() => { console.log("Admin Panel") }}
          >
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16
              }}
            >
              <Button type="primary" htmlType="submit">
                Admin Panel
              </Button>
            </Form.Item>
          </Form>
        </>
    } else {
      ret = <h1>Hello {localStorage.getItem('username')}</h1>
    }

  } else {
    // Not logged in, go and login. and a button to login
    ret =
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>

        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ margin: "0 auto", width: 400 }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}
          >
            <Input
              onChange={handleChange}
              name="username"
              value={credentials.username}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password
              onChange={handleChange}
              name="password"
              value={credentials.password}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
      ;
  }

  return ret;

};

export default Home;

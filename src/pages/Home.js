import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Breadcrumb } from "antd";
import HomeService from "../service/HomeService";

const Home = () => {
  //const history = useHistory();
  const [credentials, setCredentials] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  //var isAuthenticated = false;

  const onFinish = async values => {
    var flag = await HomeService({ values });
    if (flag) {
      setAuthenticated(true);
      console.log("Success");
    } else {
      setAuthenticated(false);
      console.log("Fail");
    }
    //setTimeout(() => history.push("/users"));
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
    // Welcome
    ret = <h1>Hello Bitch</h1>;
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

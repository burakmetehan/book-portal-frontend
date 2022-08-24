import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Main from "./pages/Main"
import { _checkAuth, _login } from "./service/AuthService";

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
    <>
      {
        isAuthenticated ? <Main /> : <Login setIsAuthenticated={setIsAuthenticated} />
      }
    </>
  )
}




/* import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd"; */
//import Home from "./pages/Home";
//import Users from "./pages/Users";
//import Books from "./pages/Books";
//import Admin from "./pages/Admin";
//import MyHeader from "./MyHeader";

/* const { Header, Content, Footer } = Layout; */

// export default function App() {
//   return (
//     <Router>
//       <Layout style={{ height: "100vh" }}>
//         {/* <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
//           <div className="logo" />
//           <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
//             <Menu.Item key="1">
//               {" "}
//               <Link to="/">Home</Link>
//             </Menu.Item>
//             <Menu.Item key="2">
//               {" "}
//               <Link to="/users">Users</Link>
//             </Menu.Item>
//             <Menu.Item key="3">
//               {" "}
//               <Link to="/books">Books</Link>
//             </Menu.Item>
//             {
//               localStorage.getItem('isAdmin') ?
//                 <Menu.Item key="4">
//                   {" "}
//                   <Link to="/admin">Admin</Link>
//                 </Menu.Item> : ""
//             }
//           </Menu>
//         </Header> */}
//         <MyHeader />
//         <Content
//           className="site-layout"
//           style={{ padding: "0 50px", marginTop: 64 }}
//         >
//           <Breadcrumb style={{ margin: "16px 0" }}>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item>Users</Breadcrumb.Item>
//             <Breadcrumb.Item>Books</Breadcrumb.Item>
//           </Breadcrumb>
//           <div
//             className="site-layout-background"
//             style={{ padding: 24, minHeight: 380 }}
//           >
//             <Switch>
//               <Route path="/books">
//                 <Books />
//               </Route>
//               <Route path="/users">
//                 <Users />
//               </Route>
//               <Route path="/">
//                 <Home />
//               </Route>
//               <Route path="/admin">
//                 <Admin />
//               </Route>
//             </Switch>
//           </div>
//         </Content>
//         <Footer style={{ textAlign: "center" }}>
//           Ant Design ©2018 Created by Ant UED
//         </Footer>
//       </Layout>
//     </Router>
//   );
// }

/* export default function App() {
  return (
    //<MyHeader />
    <h1>App.js</h1>
  )
}
 */
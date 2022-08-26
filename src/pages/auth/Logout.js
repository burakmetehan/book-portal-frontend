import React from "react";

import { Button, Popconfirm } from "antd";

export default function Logout({ setIsAuthenticated, setHeaderKey }) {
  setHeaderKey('logout')
  function onClickHandle() {
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);

  }
  return (
    <Popconfirm
      title="Are you sure to delete this task?"
      onConfirm={() => console.log("OK")}
      onCancel={() => console.log("NO")}
      okText="Yes"
      cancelText="No"
    >
      <Button type="primary">Delete</Button>
    </Popconfirm>

  );
}

/*

{/* <Button
            onClick={onClickHandle}
        >
            Logout
        </Button> */

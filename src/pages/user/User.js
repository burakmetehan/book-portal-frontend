import React, { useState } from "react";

import { Layout, Radio, Breadcrumb } from "antd";

import AddUser from "./AddUser";
import DeleteUpdateSearchUser from "./DeleteUpdateSearchUser";

const { Content } = Layout;

const options = [
  {
    label: 'Add User',
    value: 'Add User'
  },
  {
    label: 'Update/Delete User',
    value: 'Update/Delete User'
  }
];

export default function User({ setHeaderKey }) {
  setHeaderKey('user');
  const [value, setValue] = useState('Update/Delete User');

  function onChange(event) {
    setValue(event.target.value);
  };

  return (
    <Layout
      style={{
        padding: '24px 24px 24px',
      }}
    >
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />

      <Content>
        <RenderSwitch option={value} />
      </Content>
    </Layout>
  );
}

function RenderSwitch({ option }) {
  switch (option) {
    case 'Add User':
      return <AddUser />;
    case 'Update/Delete User':
      return <DeleteUpdateSearchUser />;
    default:
      return <h1>Error</h1>;
  }
}

import React, { useState } from "react";

import { Layout, Radio, Breadcrumb } from "antd";

import AddBook from "./AddBook";
import DeleteUpdateSearchBook from "./DeleteUpdateSearchBook";
import SearchBook from "./SearchBook";

const { Content } = Layout;

const options = [
  {
    label: 'Add Book',
    value: 'Add Book'
  },
  {
    label: 'Update/Delete Book',
    value: 'Update/Delete Book'
  },
  {
    label: 'Search Book',
    value: 'Search Book'
  }
];

export default function Book({ setHeaderKey }) {
  setHeaderKey('book');
  const [radioValue, setRadioValue] = useState('Update/Delete Book');

  function onChange(event) {
    setRadioValue(event.target.value);
  };

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
        <Breadcrumb.Item>Book</Breadcrumb.Item>
      </Breadcrumb>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={radioValue}
        optionType="button"
        buttonStyle="solid"
      />

      <Content>
        <RenderSwitch option={radioValue} />
      </Content>
    </Layout>
  );
}

function RenderSwitch({ option }) {
  switch (option) {
    case 'Add Book':
      return <AddBook />;
    case 'Update/Delete Book':
      return <DeleteUpdateSearchBook />;
    case 'Search Book':
      return <SearchBook />
    default:
      return <h1>Error</h1>;
  }

}
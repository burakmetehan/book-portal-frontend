import React, { useState } from "react";

import { Layout, Radio, Breadcrumb } from "antd";

import AddBook from "./AddBook";
import DeleteUpdateSearchBook from "./DeleteUpdateSearchBook";
import BookList from "./BookList";

const { Content } = Layout;

export default function Book({ setHeaderKey, admin }) {
  setHeaderKey('book');
  const [radioValue, setRadioValue] = useState('Book List');
  const options = admin ? [
    {
      label: 'Add Book',
      value: 'Add Book'
    },
    {
      label: 'Update/Delete Book',
      value: 'Update/Delete Book'
    },
    {
      label: 'Book List',
      value: 'Book List'
    }
  ] : [{
    label: 'Book List',
    value: 'Book List'
  }];

  function onChange(event) {
    setRadioValue(event.target.value);
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
    case 'Book List':
      return <BookList />
    default:
      return <h1>Error</h1>;
  }

}
import React, { useState } from "react";

import { Layout, Radio, Breadcrumb } from "antd";

import AddBook from "./AddBook";
import DeleteUpdateSearchBook from "./DeleteUpdateSearchBook";
import BookList from "./BookList";

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
    label: 'Book List',
    value: 'Book List'
  }
];

const breadcrumbItems = ['Book'];

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
        {
          breadcrumbItems.map((item) => {
            return <Breadcrumb.Item>{item}</Breadcrumb.Item>
          })
        }
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
    case 'Book List':
      return <BookList />
    default:
      return <h1>Error</h1>;
  }

}
import React, { useState } from "react";
import { Table, Collapse, Button, Space, Form, Input, Popconfirm, InputNumber } from "antd";

import BookDescription from "./BookDescription";

const { Panel } = Collapse;

export default function BookCollapse({ book, handleDelete, handleUpdate }) {

  const [isUpdateBook, setIsUpdateBook] = useState(false);

  function onBookUpdateFormFinish({ pageCount, publisher, publicationDate }) {
    console.log(pageCount, publisher, publicationDate)

    if (pageCount == null || pageCount == undefined) {
      pageCount = 0;
    }

    if (publisher == null || publisher == undefined) {
      publisher = "";
    }

    if (publicationDate == null || publicationDate == undefined) {
      publicationDate = "";
    }

    handleUpdate(book.id, pageCount, publisher, publicationDate);
    setIsUpdateBook(false);
    window.alert("Book is updated");
  };

  return (
    <Collapse>
      <Panel header={`${book.name}`} key={book.key}>
        <p>This is the data of <b>{book.name}</b>.</p>

        <BookDescription bookData={book} />

        <Space>
          <Popconfirm
            title="Are you sure to delete the book?"
            onConfirm={() => handleDelete(book.key)}
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              Delete Book
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setIsUpdateBook(!isUpdateBook)}
          >
            {isUpdateBook ? 'Close' : 'Update Book'}
          </Button>
        </Space>

        {isUpdateBook && <BookUpdateForm onFinish={onBookUpdateFormFinish} />}
      </Panel>
    </Collapse>
  );
}

const bookColumns = [
  {
    title: 'Book Name',
    dataIndex: 'name',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Page Count',
    dataIndex: 'pageCount',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
  },
  {
    title: 'Publication Date',
    dataIndex: 'publicationDate',
  }
];

function BookUpdateForm({ onFinish }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="updateBook"
      onFinish={onFinish}
      onFinishFailed={() => console.error("Fail in BookUpdateForm!")}
      initialValues={{
        pageCount: 0,
        publisher: "",
        publicationDate: ""
      }}
    >
      <Form.Item label="Page Count" name="pageCount">
        <InputNumber
          min={0}
          id="pageCount"
          name="pageCount"
          controls={false}
          placeholder="Page Count"
        />
      </Form.Item>

      <Form.Item label="Publisher" name="publisher">
        <Input
          id="publisher"
          name="publisher"
          placeholder="Publisher"
        />
      </Form.Item>

      <Form.Item label="Publication Date" name="publicationDate">
        <Input
          type="date"
          id="publicationDate"
          name="publicationDate"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

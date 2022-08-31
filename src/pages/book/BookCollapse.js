import { Button, Collapse, Form, Input, InputNumber, Popconfirm, Space, notification } from "antd";
import React, { useState } from "react";

import BookDescription from "./BookDescription";

const { Panel } = Collapse;

export default function BookCollapse({ book, handleDelete, handleUpdate }) {
  const [isUpdateBook, setIsUpdateBook] = useState(false);

  function handleBookUpdateFormFinish({ pageCount, publisher, publicationDate }) {
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

    const config = {
      description: 'Book is successfully updated!',
      duration: 4.5,
      key: 'login-credential-error',
      message: 'Book is updated!',
      placement: 'top'
    }

    notification.success(config);
  };

  return (
    <Collapse>
      <Panel header={`${book.name}`} key={book.id}>
        <p>This is the data of <b>{book.name}</b>.</p>

        <BookDescription bookData={book} />

        <Space>
          <Popconfirm
            title="Are you sure to delete the book?"
            onConfirm={() => handleDelete(book.id)}
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

        {isUpdateBook && <BookUpdateForm onFinish={handleBookUpdateFormFinish} />}
      </Panel>
    </Collapse>
  );
}

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

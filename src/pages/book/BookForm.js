import React, { useState } from "react";
import "antd/dist/antd.css";

import {
  Form,
  Input,
  InputNumber,
  Radio,
  Button,
} from "antd";

export default function BookForm({ bookData, onBookDataChange, onBookFormFinish, onBookFormFail }) {

  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 14
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      onFinish={onBookFormFinish}
      onFinishFailed={onBookFormFail}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Book Name"
        name="name"
        onChange={onBookDataChange}
        rules={[
          {
            required: true,
            message: 'Please input book name!',
          }]}>
        <Input
          id="name"
          name="name"
          value={bookData.name}
          placeholder="Book Name"
        />
      </Form.Item>

      <Form.Item
        label="Author"
        name="author"
        onChange={onBookDataChange}
        rules={[
          {
            required: true,
            message: 'Please input author name!'
          }
        ]}
      >
        <Input
          id="author"
          name="author"
          value={bookData.author}
          placeholder="Author"
        />
      </Form.Item>

      <Form.Item
        label="Page Count"
        name="pageCount"
        onChange={onBookDataChange}
        rules={[
          {
            required: true,
            message: 'Please input page count!'
          }
        ]}
      >
        <InputNumber
          min={0}
          id="pageCount"
          name="pageCount"
          value={bookData.pageCount}
          controls={false}
          placeholder="Page Count"
        />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        onChange={onBookDataChange}
        rules={[
          {
            required: true,
            message: 'Please input type!'
          }
        ]}
      >
        <Input
          id="type"
          name="type"
          value={bookData.type}
          placeholder="Type"
        />
      </Form.Item>

      <Form.Item
        label="Publisher"
        name="publisher"
        onChange={onBookDataChange}
        rules={[
          {
            required: true,
            message: 'Please input publisher!'
          }
        ]}>
        <Input
          id="publisher"
          name="publisher"
          value={bookData.publisher}
          placeholder="Publisher"
        />
      </Form.Item>

      <Form.Item
        label="Publication Date"
        name="publicationDate"
        onChange={onBookDataChange}
        rules={[
          {
            required: true,
            message: 'Please choose publication date!'
          }
        ]}
      >
        <Input
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={bookData.publicationDate}
          defaultValue="1970-01-01"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

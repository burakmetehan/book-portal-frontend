import React, { useState } from "react";
import "antd/dist/antd.css";

import {
  Form,
  Input,
  InputNumber,
  Radio,
  Button,
  Descriptions
} from "antd";

export default function BookForm({ bookData, onBookDataChange, onBookFormFinish }) {

  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  function onBookFormFinish(values) {
    console.log("Submit");
    console.log(bookData);
  }

  return (
    <div>
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
        onFinishFailed={onBookFormFinish}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name" onChange={onBookDataChange} rules={[
          {
            required: true,
            message: 'Please input your username!',
          }]}>
          <Input
            id="name"
            name="name"
            value={bookData.name}
            placeholder="Book Name"
          />
        </Form.Item>

        <Form.Item label="Author" onChange={onBookDataChange}>
          <Input
            id="author"
            name="author"
            value={bookData.author}
            placeholder="Author"
          />
        </Form.Item>

        <Form.Item label="Page Count" onChange={onBookDataChange}>
          <InputNumber
            min={0}
            id="pageCount"
            name="pageCount"
            value={bookData.pageCount}
            controls={false}
            placeholder="Page Count"
          />
        </Form.Item>

        <Form.Item label="Type" onChange={onBookDataChange}>
          <Input
            id="type"
            name="type"
            value={bookData.type}
            placeholder="Type"
          />
        </Form.Item>

        <Form.Item label="Publisher" onChange={onBookDataChange}>
          <Input
            id="publisher"
            name="publisher"
            value={bookData.publisher}
            placeholder="Publisher"
          />
        </Form.Item>

        <Form.Item label="Publication Date" onChange={onBookDataChange}>
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
    </div>
  );
};

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

export default function UpdateBook() {

  const [componentSize, setComponentSize] = useState("default");


  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [bookData, setBookData] = useState(
    {
      "name": "Dune",
      "author": "Frank Herbert",
      "pageCount": 412,
      "type": "Science Fiction",
      "publisher": "Chilton Books",
      "publicationDate": "1965-08-01"
    }
  );

  const [isSearched, setIsSearched] = useState(false);

  function onBookDataChange(event) {
    const { name, value } = event.target;

    setBookData((prevBookData) => (
      {
        ...prevBookData,
        [name]: value
      }
    ));
  }

  function onBookFormFinish(values) {
    console.log("Submit");
    console.log(bookData);
  }

  return (
    <div>
      <Form
      onFinish={() => setIsSearched(true)}>
        <Form.Item
          label="Search By Id"
          name="bookId"
        >
          <InputNumber
            min={0}
            //value={this.state.bookId}
            name="bookId"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
      {isSearched &&
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
      }
      {isSearched &&
        <Descriptions
          title="Book Info"
          bordered
          column={{
            xxl: 4,
            xl: 3,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
        >
          <Descriptions.Item label="Book Name">{bookData.name || "Book Name"}</Descriptions.Item>
          <Descriptions.Item label="Author">{bookData.author || "Author"}</Descriptions.Item>
          <Descriptions.Item label="Page Count">{bookData.pageCount || "Page Count"}</Descriptions.Item>
          <Descriptions.Item label="Type">{bookData.type || "Type"}</Descriptions.Item>
          <Descriptions.Item label="Publisher">{bookData.publisher || "Publisher"}</Descriptions.Item>
          <Descriptions.Item label="Publication Date">{bookData.publicationDate || "Publication Date"}</Descriptions.Item>
        </Descriptions>
      }
    </div>
  );
};

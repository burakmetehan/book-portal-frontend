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

import BookForm from "./BookForm";

export default function AddBook() {

  const [bookData, setBookData] = useState(
    {
      name: "",
      author: "",
      pageCount: "",
      type: "",
      publisher: "",
      publicationDate: ""
    }
  );

  function onBookDataChange(event) {
    const { name, value } = event.target;

    setBookData((prevBookData) => (
      {
        ...prevBookData,
        [name]: value
      }
    ));
  }

  // @todo
  function onBookFormFinish(values) {
    console.log("Submit");
    console.log(bookData);
  }

  return (
    <div>
      <BookForm bookData={bookData} handleBookChange={onBookDataChange} onFormFinish={onBookFormFinish} />

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
    </div>
  );
};

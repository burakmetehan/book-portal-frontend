import React, { useState } from "react";
import "antd/dist/antd.css";

import BookForm from "./BookForm";
import BookDescription from "./BookDescription"

import { _searchById } from "../../service/BookService";

import {
  Form,
  InputNumber,
  Button,
} from "antd";

export default function UpdateBook() {

  const [bookId, setBookId] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const [isBookFound, setIsBookFound] = useState(false);
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
    // update DB
  }

  async function onSearchFormFinish(event) {
    console.log(bookId);
    if (bookId >= 0) {
      // make DB call. If it is successful, `isSearched = true;` Error handling.
      const data = await _searchById({ bookId });
      setIsBookFound(true);
      //console.log(data);
    } else {
      // error handling
    }
  }

  function onBookIdChange(e) {
    console.log(e);
    setBookId(e);
  }

  return (
    <div>
      <Form
        onFinish={onSearchFormFinish}>
        <Form.Item
          label="Search By Id"
          name="bookId"
        >
          <InputNumber
            min={0}
            id="bookId"
            name="bookId"
            value={bookId}
            onChange={onBookIdChange}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>


      {
        isBookFound
        &&
        <BookForm bookData={bookData} onBookDataChange={onBookDataChange} onFormFinish={onBookFormFinish} />
      }
      {isBookFound &&
        <BookDescription bookData={bookData} />
      }
    </div>
  );
};

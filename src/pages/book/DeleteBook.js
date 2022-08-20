import React, { useState } from "react";
import "antd/dist/antd.css";

import BookForm from "./BookForm";
import BookDescription from "./BookDescription"

import { _searchById } from "../../service/BookService";

import {
  Form,
  InputNumber,
  Button,
  Divider, Radio, Table
} from "antd";

const columns = [
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
  },
];

const rowSelection = {
  onChange: (selectedRowKey, selectedRow) => {
    //console.log(`selectedRowKey: ${selectedRowKey}`, 'selectedRow: ', selectedRow);

    console.log(selectedRow[0]);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

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
    // delete book from DB
  }

  async function onSearchFormFinish(event) {
    console.log(bookId);
    if (bookId >= 0) {
      // make DB call. If it is successful, `isSearched = true;` Error handling.
      const data = await _searchById({ bookId });
      setIsBookFound(true);
      
      console.log(data);
    } else {
      // error handling
    }
  }

  function onBookIdChange(e) {
    console.log(e);
    setBookId(e);
  }

  let data = [{
    key: 14,
    name: "Dune",
    author: "Frank Herbert",
    pageCount: 412,
    type: "Science Fiction",
    publisher: "Chilton Books",
    publicationDate: "1965-08-01"
  },
  {
    key: 15,
    name: "Dune",
    author: "Frank Herbert",
    pageCount: 415,
    type: "Science Fiction",
    publisher: "Chilton Books",
    publicationDate: "1965-08-01"
  }]

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

      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection
        }}
        columns={columns}
        dataSource={data}
      />

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

// @TODO
// Add name search and show the result in table. When a book is chosen show the summary of the book.







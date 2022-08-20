import React, { useContext, useEffect, useRef, useState } from 'react';
import "antd/dist/antd.css";

import { _searchById } from "../../service/BookService";

import { Button, Popconfirm, Table } from "antd";

export default function DeleteBook() {
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
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        bookData.length >= 1 ? (
          <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const [bookData, setBookData] = useState([
    {
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
    }
  ]);

  const handleDelete = (key) => {
    const newBookData = bookData.filter((item) => item.key !== key);
    setBookData(newBookData);
  };

  return (
    <div>
      <Table
        bordered
        dataSource={bookData}
        columns={columns}
      />
    </div>
  );
};

// @TODO
// Add name search and show the result in table. When a book is chosen show the summary of the book.






/* const [bookId, setBookId] = useState(0);
  const [isBookFound, setIsBookFound] = useState(false);
  const [bookData, setBookData] = useState(
    {
      "name": "Dune",
      "author": "Frank Herbert",
      "pageCount": 412,
      "type": "Science Fiction",
      "publisher": "Chilton Books",
      "publicationDate": "1965-08-01"
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ); */
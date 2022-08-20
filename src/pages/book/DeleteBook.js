import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";

import { _searchAll, _searchById, _deleteBook } from "../../service/BookService";

import { Form, InputNumber, Button, Popconfirm, Table } from "antd";

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
          <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.key, record)}>
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

  useEffect( () => {
    async function searchAll () {
      const data = await _searchAll({
        pageSize: 5,
        pageNumber: 0
      });

      const newContent = data.content.map((book) => {
        return (
          {
            ...book,
            key: book.id,
            publicationDate: book.publicationDate.slice(0, 10)
          }
        );
      });
  
      setBookData(newContent);
    };

    searchAll();
        
  }, []);

  const [bookId, setBookId] = useState(0);

  async function handleDelete(key) {
    // make DB call by key
    const data = await _deleteBook({ bookId: key });

    console.log(data);

    if (data.name == "AxiosError") { // Error
      window.alert("Book is not Found")
      return;
    }

    // Deleted
    // Can be changed later according to return object
    const newBookData = bookData.filter((item) => item.key !== key);
    setBookData(newBookData);
  };


  async function onSearch() {
    if (bookId < 0) {
      // Make this part inside input by using min and message
      window.alert("Book Id should be greater than or equal 0")
      return;
    }

    const data = await _searchById({ bookId });

    if (data.empty) { // Not Found
      setBookData([]);
      return;
    }

    // Found
    // Can be changed later according to return object
    const newContent = data.content.map((book) => {
      return (
        {
          ...book,
          key: book.id,
          publicationDate: book.publicationDate.slice(0, 10)
        }
      );
    });

    setBookData(newContent);
  }

  function onBookIdChange(newId) {
    console.log(newId);
    setBookId(newId);
  }

  return (
    <div>
      <Form
        onFinish={onSearch}>
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
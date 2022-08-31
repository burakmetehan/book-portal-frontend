import { Button, Col, Form, Input, InputNumber, Row, notification } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from 'react';

import { BookListParser } from "./BookContentParser";
import BookShow from "./BookShow";

import { _deleteBook, _searchAllBookList, _searchBookByIdList, _searchBookByNameList, _updateBook } from '../../service/BookService';

export default function DeleteUpdateSearchBook() {
  const [bookId, setBookId] = useState(0);
  const [bookName, setBookName] = useState("");
  const [bookData, setBookData] = useState([{
    key: 0,
    name: "",
    author: "",
    pageCount: -1,
    type: "",
    publisher: "",
    publicationDate: "1970-01-01"
  }]);

  /* ========== Use Effect Function ========== */
  useEffect(() => {
    async function searchAll() {
      const response = await _searchAllBookList();

      if (!response.successful) { // Not Found
        setBookData([]);
        return;
      }

      const newContent = BookListParser(response.data);

      setBookData(newContent);
    };

    searchAll();
  }, [bookId != null, bookName !== ""]);

  /* ========== Event Listener Functions ========== */
  function handleBookIdChange(newId) {
    setBookId(newId);
  }

  function handleBookNameChange(event) {
    setBookName(event.target.value);
  }

  async function handleBookSearchById() {
    if (bookId < 0) {
      const config = {
        description: 'Check Book ID! Book ID should be greater than or equal 0!',
        duration: 4.5,
        key: 'delete-update-search-book-id-search-error',
        message: 'Check Book ID!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBookByIdList({ bookId });

    if (!response.successful) { // Not Found
      setBookData([]);
      return;
    }

    // Book is found
    const newContent = BookListParser(response.data);

    setBookData(newContent);
  }

  async function handleBookSearchByName() {
    if (bookName === "" || bookName == null) {
      const config = {
        description: 'Check book name! Book name should be provided!',
        duration: 4.5,
        key: 'delete-update-search-book-name-search-error',
        message: 'Check Book Name!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBookByNameList({ bookName });

    if (!response.successful) { // Not Found
      setBookData([]);
      return;
    }

    // Book(s) is found
    const newContent = BookListParser(response.data);

    setBookData(newContent);
  }

  /* ========== Handle Functions ========== */
  async function handleDelete(key) {
    const data = await _deleteBook({ bookId: key });

    if (!data.successful) { // Error
      const config = {
        description: '',
        duration: 4.5,
        key: 'delete-update-search-book-delete-error',
        message: 'Book is not found!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    // Delete is successful
    const newBookData = bookData.filter((item) => item.key !== key);

    setBookData(newBookData);
  }

  async function handleUpdate(key, pageCount, publisher, publicationDate) {
    const data = await _updateBook({
      bookId: key,
      pageCount: pageCount,
      publisher: publisher,
      publicationDate: publicationDate
    })

    if (!data.successful) { // Unsuccessful request
      const config = {
        description: 'An error occured! Check form data and try again!',
        duration: 4.5,
        key: 'delete-update-search-book-update-error',
        message: 'Check the form!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    // Update is successful
    const newBookData = bookData.map((item) => {
      if (item.key !== key) {
        return item;
      } else {
        return {
          ...item,
          pageCount: pageCount,
          publisher: publisher,
          publicationDate: publicationDate
        }
      }
    })

    setBookData(newBookData);
  }

  /* ========== Return ========== */
  return (
    <>
      <div className='search-forms'>
        <Row>
          <Col span={12}>
            <Form
              onFinish={handleBookSearchById}
              onFinishFailed={() => console.log("Failed in Search Book By Id!")}
            >
              <Form.Item
                label="Search Book By Id"
                rules={[{ message: 'Please input an integer greater than or equal to 0!' }]}
              >
                <InputNumber
                  min={0}
                  id="bookId"
                  name="bookId"
                  value={bookId}
                  onChange={handleBookIdChange}
                />

                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              onFinish={handleBookSearchByName}
              onFinishFailed={() => console.log("Failed in Search Book By Name!")}
            >
              <Form.Item
                label="Search Book By Name"
                rules={[{ message: 'Please input book name' }]}
              >
                <Input
                  id="name"
                  name="name"
                  value={bookName}
                  onChange={handleBookNameChange}
                />

                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <div className='book-show'>
        <h1>Books</h1>
        <BookShow
          books={bookData}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  )
}
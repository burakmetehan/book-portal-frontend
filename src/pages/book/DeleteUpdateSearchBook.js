import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Col, Row } from "antd";
import { _deleteBook, _searchAllBook, _searchBookById, _searchBookByName, _updateBook } from '../../service/BookService';

import BookContentParser from "./BookContentParser";
import BookShow from "./BookShow";

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
      const data = await _searchAllBook({
        pageSize: 10,
        pageNumber: 0
      });

      const newContent = BookContentParser(data);

      setBookData(newContent);
    };

    searchAll();
  }, [bookId != null, bookName !== ""]);

  /* ========== Event Listener Functions ========== */
  function onBookIdChange(newId) {
    setBookId(newId);
  }

  function onBookNameChange(event) {
    setBookName(event.target.value);
  }

  async function onBookSearchById() {
    if (bookId < 0) {
      window.alert("Check Book Id. Book Id should be greater than or equal 0!")
      return;
    }

    const data = await _searchBookById({ bookId });

    if (!data.successful) { // Not Found
      setBookData([]);
      return;
    }

    // Book is found
    const newContent = BookContentParser(data);

    setBookData(newContent);
  }

  async function onBookSearchByName() {
    if (bookName === "" || bookName == null) {
      window.alert("Check Book Name. Book name should be provided!")
      return;
    }

    const data = await _searchBookByName({ bookName });

    if (!data.successful) { // Not Found
      setBookData([]);
      return;
    }

    // Book(s) is found
    const newContent = BookContentParser(data);

    setBookData(newContent);
  }

  /* ========== Handle Functions ========== */
  async function handleDelete(key) {
    const data = await _deleteBook({ bookId: key });

    if (!data.successful) { // Error
      window.alert("Book is not Found")
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
      window.alert("Error in update book");
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
    // const bookIndex = bookData.findIndex((item) => item.key === key);

    setBookData(newBookData);
  }

  /* ========== Return ========== */
  return (
    <>
      <div className='search-forms'>
        <Row>
          <Col span={12}>
            <Form
              onFinish={onBookSearchById}
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
                  onChange={onBookIdChange}
                />

                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              onFinish={onBookSearchByName}
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
                  onChange={onBookNameChange}
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
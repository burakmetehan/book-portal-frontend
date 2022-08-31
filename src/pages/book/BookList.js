import { Button, Col, Form, Input, InputNumber, notification, Radio, Row, Space, Table } from 'antd';
import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react";

import { BOOK_COLUMNS, PAGINATION } from "../../globals/GlobalVariables";
import { BookContentParserWithUserListInfo } from "./BookContentParser";

import {
  _addFavoriteList,
  _addReadList,
  _removeFavoriteList,
  _removeReadList
} from "../../service/BookListService";
import { _searchAllBook, _searchBookById, _searchBookByName } from "../../service/BookService";
import { _searchUserByUsernameList } from "../../service/UserService";

const options = [
  {
    label: 'Search Book By ID',
    value: 'Search Book By ID'
  },
  {
    label: 'Search Book By Book Name',
    value: 'Search Book By Book Name'
  }
];


export default function BookList() {
  const bookColumns = [
    ...BOOK_COLUMNS,
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' direction="vertical">
          <Button
            type="primary"
            onClick={() => handleFavoriteList(record.id, record.key)}
            danger={record.isFavorite}
          >
            {record.isFavorite ? 'Remove Favorite List' : 'Add Favorite List'}
          </Button>

          <Button
            type="primary"
            onClick={() => handleReadList(record.id, record.key)}
            danger={record.isRead}
          >
            {record.isRead ? 'Remove Read List' : 'Add Read List'}
          </Button>
        </Space>
      )
    }
  ];

  /* ========== States ========== */
  const [bookId, setBookId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [bookName, setBookName] = useState('');
  const [radioValue, setRadioValue] = useState('Search Book By ID')
  const [readBooks, setReadBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isSearchAll, setIsSearchAll] = useState(true);

  const [bookData, setBookData] = useState([{
    key: 0,
    name: "",
    author: "",
    pageCount: -1,
    type: "",
    publisher: "",
    publicationDate: "1970-01-01",
    isFavorite: false,
    isRead: false
  }]);

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(PAGINATION)

  /* ========== Refs ========== */
  const isFirstRenderUserId = useRef(true); // Variable to block run in first render
  const isFirstRenderPagination = useRef(true);

  /* ========== Use Effect Functions ========== */
  // In the beginning, getting user data from database
  useEffect(() => {
    async function searchUser() {
      setLoading(true);

      const username = sessionStorage.getItem('Username'); // Getting username from sessionStorage
      const response = await _searchUserByUsernameList({ username }); // Database call for search by username

      if (!response.successful) { // Not successful
        const config = {
          description: 'An error occurred while searching user! Try Logging out and Logging in again!',
          duration: 4.5,
          key: 'book-list-search-user-error',
          message: 'User is not found!',
          placement: 'top'
        }
  
        notification.error(config);
        return;
      }

      const user = response.data && response.data[0];

      setUserId(user.id);
      setReadBooks(user.readList.map(book => book.id));
      setFavoriteBooks(user.favoriteList.map(book => book.id));

      setLoading(false);
    }

    searchUser();
  }, []);

  // In the beginning, load the all books. Since userId does not change except the beginning. It will run once.
  useEffect(() => {
    async function searchAllBook() {
      setLoading(true);

      const response = await _searchAllBook(pagination); // searching books by pagination

      if (!response.successful) { // Not successful
        const config = {
          description: 'An error occurred while searching books! Try again!',
          duration: 4.5,
          key: 'book-list-search-all-book-error',
          message: 'Books are not found!',
          placement: 'top'
        }
  
        notification.error(config);
        return;
      }

      // setting total elements in the beginning
      setPagination({
        ...pagination,
        total: response.totalElements
      })

      const newContent = BookContentParserWithUserListInfo(response, favoriteBooks, readBooks);

      setBookData(newContent);

      setLoading(false);
    }

    // Block the run of the useEffect in the initial render
    if (isFirstRenderUserId.current) {
      isFirstRenderUserId.current = false;
      return;
    }

    searchAllBook();
  }, [userId])

  // According to change in pagination, load book
  useEffect(() => {
    async function searchAllBook() {
      setLoading(true);

      const response = await _searchAllBook(pagination);

      if (!response.successful) { // Not successful
        return;
      }

      const newContent = BookContentParserWithUserListInfo(response, favoriteBooks, readBooks);

      setIsSearchAll(false); // Block infinite loop search because of the pagination state change below
      setBookData(newContent);
      setPagination({
        ...pagination,
        total: response.totalElements
      })

      setLoading(false);
    }

    if (isFirstRenderPagination.current) {
      isFirstRenderPagination.current = false;
      return;
    }

    if (!isSearchAll) {
      setIsSearchAll(true);
      return;
    }

    searchAllBook();
  }, [pagination]);

  // useEffect when bookId or bookName is reset
  useEffect(() => {
    setIsSearchAll(true);
    setPagination({
      ...PAGINATION
    });
  }, [bookId == null, bookName === ""]);


  /* ========== Handle Functions ========== */
  function handleTableChange(newPagination) {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      pageNumber: newPagination.current - 1
    });
  }

  function handleBookIdChange(newId) {
    setBookId(newId);
  }

  function handleBookNameChange(event) {
    setBookName(event.target.value);
  }

  function handleChangeRadioValue(event) {
    setRadioValue(event.target.value);
  };

  async function handleFavoriteList(id, key) {
    let response;
    const isAdd = !(bookData[key].isFavorite);

    if (isAdd) {
      response = await _addFavoriteList({ userId, bookId: id });
      bookData[key].isFavorite = true;
      setFavoriteBooks([
        ...favoriteBooks,
        bookData[key].id
      ]);
    } else {
      response = await _removeFavoriteList({ userId, bookId: id });
      bookData[key].isFavorite = false;

      const newFavoriteBooks = favoriteBooks.filter((bookId) => {
        return bookId !== bookData[key].id;
      })

      setFavoriteBooks(newFavoriteBooks);
    }

    if (!response.successful) { // Not successful
      bookData[key].isFavorite = !(bookData[key].isFavorite);
      const config = {
        description: 'An error is occured while handling favorite lists!',
        duration: 4.5,
        key: 'book-list-handle-fav-error',
        message: 'Error in handleFav',
        placement: 'top'
      }

      notification.error(config);
      return;
    }

    const newContent = [...bookData];
    setBookData(newContent);
  }

  async function handleReadList(id, key) {
    let response;
    const isAdd = !(bookData[key].isRead);

    if (isAdd) {
      response = await _addReadList({ userId, bookId: id });
      bookData[key].isRead = true;
      setReadBooks([
        ...readBooks,
        bookData[key].id
      ]);
    } else {
      response = await _removeReadList({ userId, bookId: id });
      bookData[key].isRead = false;

      const newReadBooks = readBooks.filter((bookId) => {
        return bookId !== bookData[key].id;
      })

      setFavoriteBooks(newReadBooks);
    }

    if (!response.successful) { // Not successful
      bookData[key].isRead = !(bookData[key].isRead);
      const config = {
        description: 'An error is occured while handling read lists!',
        duration: 4.5,
        key: 'book-list-handle-read-error',
        message: 'Error in handleRead',
        placement: 'top'
      }

      notification.error(config);
      return;
    }

    const newContent = [...bookData];
    setBookData(newContent);
  }

  async function handleBookSearchById() {
    if (bookId < 0) {
      const config = {
        description: 'Check Book ID! Book ID should be greater than or equal to 0!',
        duration: 4.5,
        key: 'handle-book-search-by-id-warning',
        message: 'Check Book ID!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBookById({ bookId });

    if (!response.successful) {
      setBookData([]);

      const config = {
        description: 'Book could not be found! Check book id and try again!',
        duration: 4.5,
        key: 'handle-book-search-by-id-error',
        message: 'Book is not found!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const newContent = BookContentParserWithUserListInfo(response, favoriteBooks, readBooks);

    setBookData(newContent);
    setIsSearchAll(false);
    setPagination({
      ...pagination,
      current: response.pageable.pageNumber + 1,
      pageSize: response.pageable.pageSize,
      pageNumber: response.pageable.pageNumber,
      total: response.totalElements
    })
  }

  async function handleBookSearchByName() {
    if (bookName == null || bookName === "") {
      const config = {
        description: 'Check Book Name! Book name should be provided!',
        duration: 4.5,
        key: 'handle-book-search-by-name-error',
        message: 'Check Book Name!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBookByName({ bookName });

    if (!response.successful) {
      setBookData([]);

      const config = {
        description: 'Book could not be found! Check book name and try again!',
        duration: 4.5,
        key: 'handle-book-search-by-name-error',
        message: 'Book is not found!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const newContent = BookContentParserWithUserListInfo(response, favoriteBooks, readBooks);

    setBookData(newContent);
    setIsSearchAll(false);
    setPagination({
      ...pagination,
      current: response.pageable.pageNumber + 1,
      pageSize: response.pageable.pageSize,
      pageNumber: response.pageable.pageNumber,
      total: response.totalElements
    })
  }

  return (
    <>
      <Radio.Group
        options={options}
        onChange={handleChangeRadioValue}
        value={radioValue}
        optionType="default"
      />
      <div className='search-forms'>
        <Row>
          {
            radioValue === 'Search Book By ID' ?
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
              </Col> :
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
          }
        </Row>
      </div>
      <Table
        loading={loading}
        columns={bookColumns}
        dataSource={bookData}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}

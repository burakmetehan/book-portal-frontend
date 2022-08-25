import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";

import { Space, Table, Button } from 'antd';
import { _addFavoriteList, _addReadList, _removeFavoriteList, _removeReadList } from "../../service/BookListService";

import { _searchUserByName2 } from "../../service/UserService";
import { _searchAllBook } from "../../service/BookService";

import { BookContentParserWithUserListInfo } from "./BookContentParser";

export default function SearchBook() {
  const bookColumns = [
    {
      title: 'Book Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Page Count',
      dataIndex: 'pageCount',
      key: 'pageCount'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher'
    },
    {
      title: 'Publication Date',
      dataIndex: 'publicationDate',
      key: 'publicationDate'
    },
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
  const [userId, setUserId] = useState(0);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
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
  const [pagination, setPagination] = useState({
    showSizeChanger: true,
    current: 1, // Current page number
    pageNumber: 0, // Page number for backend call
    pageSize: 5, // Page size for both table and backend call
    total: 0 // Total number of data items
  })
  const [loading, setLoading] = useState(false);

  const isFirstRender = useRef(true); // Variable to block run in first render
  const isFirstRenderPagination = useRef(true);

  /* ========== Use Effect Functions ========== */
  // In the beginning, getting user data from database
  useEffect(() => {
    async function searchUser() {
      setLoading(true);

      const username = sessionStorage.getItem('Username'); // Getting username from sessionStorage
      const responseData = await _searchUserByName2({ username }); // Database call for search by username

      if (!responseData.successful) { // Not successful
        window.alert("Error in searchUser in SearchBook!");
        return;
      }

      setUserId(responseData.id);
      setReadBooks(responseData.readList.map(book => book.id));
      setFavoriteBooks(responseData.favoriteList.map(book => book.id));

      setLoading(false);
    }

    searchUser();
  }, []);

  // In the beginning, load the all books. Since userId does not change except the beginning. It will run once.
  useEffect(() => {
    async function searchAllBook() {
      setLoading(true);

      const responseData = await _searchAllBook(pagination); // searching books by pagination

      if (!responseData.successful) { // Not successful
        window.alert("Error in searchAllBook in SearchBook!");
        return;
      }

      // setting total elements in the beginning
      setPagination({
        ...pagination,
        total: responseData.totalElements
      })

      const newContent = BookContentParserWithUserListInfo(responseData, favoriteBooks, readBooks);

      setBookData(newContent);

      setLoading(false);
    }

    // Block the run of the useEffect in the initial render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    searchAllBook();
  }, [userId])

  // According to change in pagination, load book
  useEffect(() => {
    async function searchAllBook() {
      setLoading(true);

      const responseData = await _searchAllBook(pagination);

      if (!responseData.successful) { // Not successful
        return;
      }

      const newContent = BookContentParserWithUserListInfo(responseData, favoriteBooks, readBooks);

      console.log(newContent)
      setBookData(newContent);

      setLoading(false);
    }

    if (isFirstRenderPagination.current) {
      isFirstRenderPagination.current = false;
      return;
    }

    searchAllBook();
  }, [pagination]);


  /* ========== Handle Functions ========== */
  async function handleFavoriteList(id, key) {
    let responseData;
    const isAdd = !(bookData[key].isFavorite);

    if (isAdd) {
      responseData = await _addFavoriteList({ userId, bookId: id });
      bookData[key].isFavorite = true;
    } else {
      responseData = await _removeFavoriteList({ userId, bookId: id });
      bookData[key].isFavorite = false;
    }

    if (!responseData.successful) { // Not successful
      bookData[key].isFavorite = !(bookData[key].isFavorite);
      window.alert("Error handleFav");
      console.log("fail")
    }

    console.log("success")
    const newContent = [...bookData];
    setBookData(newContent);
  }

  async function handleReadList(id, key) {
    let responseData;
    const isAdd = !(bookData[key].isRead);

    if (isAdd) {
      responseData = await _addReadList({ userId, bookId: id });
      bookData[key].isRead = true;
    } else {
      responseData = await _removeReadList({ userId, bookId: id });
      bookData[key].isRead = false;
    }

    if (!responseData.successful) { // Not successful
      bookData[key].isRead = !(bookData[key].isRead);
      window.alert("Error handleFav");
      console.log("fail")
    }

    console.log("success")
    const newContent = [...bookData];
    setBookData(newContent);
  }

  function handleTableChange(newPagination) {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      pageNumber: newPagination.current - 1
    });
  }

  return (
    <>
      <Button type="primary" onClick={() => console.log(bookData)}>bookData</Button>
      <Table
        loading={loading}
        columns={bookColumns}
        dataSource={[...bookData]}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}

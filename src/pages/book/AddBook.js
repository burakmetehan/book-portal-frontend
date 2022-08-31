import { notification } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";

import BookDescription from "./BookDescription";
import BookForm from "./BookForm";

import { _addBook } from "../../service/BookService";

export default function AddBook() {

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    pageCount: "",
    type: "",
    publisher: "",
    publicationDate: ""
  });

  /* ========== Event Listener Functions ========== */
  function handleBookDataChange(event) {
    const { name, value } = event.target;

    setBookData((prevBookData) => ({
      ...prevBookData,
      [name]: value
    }));
  }

  async function handleBookFormFinish() {
    const response = await _addBook(bookData);

    if (response.successful) {
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
    }
  }

  function handleBookFormFail() {
    const config = {
      description: '',
      duration: 4.5,
      key: 'add-book-form-error',
      message: 'Please, fill the all necessary fields!',
      placement: 'top'
    }

    notification.error(config);
    setIsSuccessful(false);
    return;
  }

  return (
    <div>
      <BookForm
        bookData={bookData}
        handleBookDataChange={handleBookDataChange}
        handleBookFormFinish={handleBookFormFinish}
        onBookFormFail={handleBookFormFail}
      />

      {
        isSuccessful ? <BookDescription bookData={bookData} /> : null
      }

    </div>
  );
};

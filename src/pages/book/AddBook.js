import React, { useState } from "react";
import "antd/dist/antd.css";

import BookForm from "./BookForm";
import BookDescription from "./BookDescription";

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
  function onBookDataChange(event) {
    const { name, value } = event.target;

    setBookData((prevBookData) => ({
      ...prevBookData,
      [name]: value
    }));
  }

  async function onBookFormFinish() {
    const data = await _addBook(bookData);

    if (data.successful) {
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
    }
  }

  function onBookFormFail() {
    window.alert("Please, fill the all necessary fields!")
  }

  return (
    <div>
      <BookForm
        bookData={bookData}
        onBookDataChange={onBookDataChange}
        onBookFormFinish={onBookFormFinish}
        onBookFormFail={onBookFormFail}
      />

      {
        isSuccessful ? <BookDescription bookData={bookData} /> : null
      }

    </div>
  );
};

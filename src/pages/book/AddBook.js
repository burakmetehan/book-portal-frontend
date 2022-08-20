import React, { useState } from "react";
import "antd/dist/antd.css";

import BookDescription from "./BookDescription";
import BookForm from "./BookForm";

export default function AddBook() {

  const [bookData, setBookData] = useState(
    {
      name: "",
      author: "",
      pageCount: "",
      type: "",
      publisher: "",
      publicationDate: ""
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

  // @todo
  function onBookFormFinish(values) {
    console.log("Submit");
    console.log(bookData);
  }

  return (
    <div>
      <BookForm bookData={bookData} onBookDataChange={onBookDataChange} onFormFinish={onBookFormFinish} />

      <BookDescription bookData={bookData} />
    </div>
  );
};

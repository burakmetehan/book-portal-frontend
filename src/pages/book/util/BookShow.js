import React from "react";

import BookCollapse from "./BookCollapse";

export default function BookShow({ books, handleDelete, handleUpdate }) {
  return (
    books.map((book) => {
      return (
        <BookCollapse
          key={book.key}
          book={book}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      );
    })
  );
}
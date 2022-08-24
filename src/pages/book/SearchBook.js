import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";

import {
  Form,
  Input,
  InputNumber,
  Radio,
  Button,
  Descriptions
} from "antd";

export default function SearchBook() {
  const [userId, setUserId] = useState();
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
  const [componentSize, setComponentSize] = useState("default");

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

  return (

  );
}
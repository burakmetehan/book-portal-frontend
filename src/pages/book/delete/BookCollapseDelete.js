import { Button, Collapse, Popconfirm } from "antd";
import React from "react";

import BookDescription from "../util/BookDescription";

const { Panel } = Collapse;

export default function BookCollapseDelete({ book, handleDelete }) {
  return (
    <Collapse>
      <Panel header={`${book.name}`} key={book.id}>
        <p>This is the data of <b>{book.name}</b>.</p>

        <BookDescription bookData={book} />

        <Popconfirm
          title="Are you sure to delete the book?"
          onConfirm={() => handleDelete(book.id)}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Delete Book
          </Button>
        </Popconfirm>
      </Panel>
    </Collapse>
  );
}

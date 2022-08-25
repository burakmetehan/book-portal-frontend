import React from "react";
import { Pagination } from 'antd';

import UserCollapse from "./UserCollapse";

export default function UserShow({ users, handleDelete, handleUpdate, pagination, onPaginationChange }) {
  return (
    <>
      <div>
        {users.map((user) => {
          return (<UserCollapse user={user} handleDelete={handleDelete} handleUpdate={handleUpdate} />)
        })}
      </div>

      <div>
        <Pagination
          pageSizeOptions={pagination.pageSizeOptions}
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(newPageNumber, newPageSize) => onPaginationChange({ newPageNumber, newPageSize })}
          showSizeChanger={pagination.showSizeChanger}
        />
      </div>
    </>
  );
}
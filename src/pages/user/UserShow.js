import React from "react";

import UserCollapse from "./UserCollapse";

export default function UserShow({ users, handleDelete, handleUpdate }) {
  return (
    <>
      {users.map((user) => {
        return (<UserCollapse user={user} handleDelete={handleDelete} handleUpdate={handleUpdate} />)
      })}
    </>
  );
}
import React from "react";

import UserCollapse from "./UserCollapse";
import { _searchAll } from "../../service/UserService";

export default function UserShow({ users, handleDelete }) {

  return (
    users.map((user) => {
      return (<UserCollapse user={user} handleDelete={handleDelete} />)
    })
  );
}
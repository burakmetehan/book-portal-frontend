import React, { useEffect, useState } from "react";

import UserCollapse from "./UserCollapse";
import { _searchAll } from "../../service/UserService";

export default function UserShow() {

  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    async function searchAllUsers() {
      const data = await _searchAll({
        pageSize: 10,
        pageNumber: 0
      });

      const newContent = data.content.map((user) => {
        let readList = user.readList;
        let favoriteList = user.favoriteList;

        readList = readList.map((book) => {
          return {
            ...book,
            key: book.id,
            publicationDate: book.publicationDate.slice(0, 10)
          }
        });

        favoriteList = favoriteList.map((book) => {
          return {
            ...book,
            key: book.id,
            publicationDate: book.publicationDate.slice(0, 10)
          }
        });

        return {
          ...user,
          readList: readList,
          favoriteList: favoriteList
        }
      });

      setUsers(newContent);
    }
    
    searchAllUsers();
  }, [])

  return (
    users.map((user) => {
      return (<UserCollapse user={user} />)
    })
  );
}
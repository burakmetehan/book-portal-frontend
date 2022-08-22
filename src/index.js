import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AddBook from "./pages/book/AddBook";
import UpdateBook from "./pages/book/UpdateBook";
import DeleteBook from "./pages/book/DeleteBook"

import AddUser from "./pages/user/AddUser";
import DeleteUser from "./pages/user/DeleteUser";

import UserShow from './pages/user/UserShow';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <DeleteUser />
  </React.StrictMode>
);

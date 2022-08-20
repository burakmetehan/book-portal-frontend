export function _searchAll(pagination) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/books?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Error in BookService!");
      return;
    });
}

export function _searchById({ bookId }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/books/${bookId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Error in BookService!");
      return;
    });
}

export function _searchByName({ bookName }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/books/name/${bookName}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Error in BookService!");
      return;
    });
}

export function _addBook({
  name,
  author,
  pageCount,
  type,
  publisher,
  publicationDate
}) {

  var axios = require('axios');
  var data = JSON.stringify({
    "name": name,
    "author": author,
    "pageCount": pageCount,
    "type": type,
    "publisher": publisher,
    "publicationDate": publicationDate
  });

  var config = {
    method: 'post',
    url: `http://localhost:8080/books`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Error in BookService!");
      return;
    });
}

export function _deleteBook({ bookId }) {

  var axios = require('axios');

  var config = {
    method: 'delete',
    url: `http://localhost:8080/books/${bookId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    }
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log("Error in BookService!");
      return error;
    });
}


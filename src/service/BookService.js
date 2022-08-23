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
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      console.error("Error in adding book!")
      return {
        successful: false
      };
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
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      console.error("Error in adding book!")
      return {
        successful: false
      };
    });
}

export function _searchAllBook(pagination) {

  var axios = require('axios');
  var data = JSON.stringify({});

  const pageNumber = pagination.pageNumber || 0;
  const pageSize = pagination.pageSize || 10;

  var config = {
    method: 'get',
    url: `http://localhost:8080/books?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Authorization')
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      console.error("Error in adding book!")
      return {
        successful: false
      };
    });
}

export function _searchBookById({ bookId }) {

  var axios = require('axios');
  var data = JSON.stringify({});

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
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      console.error("Error in adding book!")
      return {
        successful: false
      };
    });
}

/**
 * Searching books that contains the given bookName.
 * @param {String} bookName Name of the book(s) to be searched
 * @returns Paged book(s)
 */
export function _searchBookByName({ bookName }) {

  var axios = require('axios');
  var data = JSON.stringify({});

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
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      console.error("Error in adding book!")
      return {
        successful: false
      };
    });
}

export function _updateBook() {
  // @TODO

  return false;

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      console.error("Error in adding book!")
      return {
        successful: false
      };
    });
}

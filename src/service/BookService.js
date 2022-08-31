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
    headers: {},
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
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchAllBook(pagination) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `http://localhost:8080/books`,
    headers: {},
    param:{
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize
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
      console.error("Error in search all book!")
      return {
        successful: false
      };
    });
}

export function _searchAllBookList() {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `http://localhost:8080/books/no-page`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchBookById({ bookId }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `http://localhost:8080/books/${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchBookByIdList({ bookId }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `http://localhost:8080/books/no-page/${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: [response.data]
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchBookByName({ bookName, pageNumber, pageSize }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `http://localhost:8080/books/name?bookName=${bookName}`,
    headers: {},
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize
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
      return {
        successful: false
      };
    });
}

export function _searchBookByNameList({ bookName }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `http://localhost:8080/books/no-page/name`,
    headers: {},
    params: {
      bookName: bookName
    }
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _updateBook({ bookId, pageCount, publisher, publicationDate }) {

  var axios = require('axios');
  var data = JSON.stringify({
    "pageCount": pageCount || "",
    "publisher": publisher || "",
    "publicationDate": publicationDate || ""
  });

  var config = {
    method: 'put',
    url: `http://localhost:8080/books/${bookId}`,
    headers: {},
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
      return {
        successful: false
      };
    });
}

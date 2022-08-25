export function _addFavoriteList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: `http://localhost:8080/ar/a/favoriteList?userId=${userId}&bookId=${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function (error) {
      return {
        successful: false
      }
    });
}

export function _addReadList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: `http://localhost:8080/ar/a/readList?userId=${userId}&bookId=${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function (error) {
      return {
        successful: false
      }
    });

}

export function _removeFavoriteList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: `http://localhost:8080/ar/r/favoriteList?userId=${userId}&bookId=${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function (error) {
      return {
        successful: false
      }
    });
}

export function _removeReadList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: `http://localhost:8080/ar/r/readList?userId=${userId}&bookId=${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function (error) {
      return {
        successful: false
      }
    });

}

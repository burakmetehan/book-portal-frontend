export function _addFavoriteList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: `http://localhost:8080/fav`,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: true
    }
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
    url: `http://localhost:8080/read`,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: true
    }
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
    url: `http://localhost:8080/fav`,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: false
    }
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
    url: `http://localhost:8080/read`,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: false
    }
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

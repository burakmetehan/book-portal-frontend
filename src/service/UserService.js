export function _addUser({ username, password }) {
  var axios = require('axios');

  var data = JSON.stringify({
    username: username,
    password: password
  });

  var config = {
    method: 'post',
    url: 'http://localhost:8080/users/',
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

export function _deleteUser({ userId }) {

  var axios = require('axios');

  var config = {
    method: 'delete',
    url: `http://localhost:8080/users/${userId}`,
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

export function _searchAllUsers(pagination) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
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

export function _searchAllUsersList() {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/no-pagination`,
    headers: {},
    data: data
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

export function _searchUserById({ userId }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/${userId}`,
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

export function _searchUserByIdList({ userId }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/no-pagination/${userId}`,
    headers: {},
    data: data
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

/**
 * Searching users that contains the given username.
 * @param {String} username Name of the users(s) to be searched
 * @returns Paged user(s)
 */
export function _searchUserByName({ username, pagination }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/name/${username}?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
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

export function _searchUserByUsernameList({ username }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/no-pagination/name/${username}`,
    headers: {},
    data: data
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

export function _searchUserByUsername({ username }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/name?username=${username}`,
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

export function _updateUser({ userId, newPassword }) {

  var axios = require('axios');
  var data = JSON.stringify({
    'password': newPassword
  });

  var config = {
    method: 'put',
    url: `http://localhost:8080/users/${userId}`,
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

export function _addUser({ username, password }) {
  var axios = require('axios');

  var data = JSON.stringify({
    username: username,
    password: password
  });

  var config = {
    method: 'post',
    url: 'http://localhost:8080/users/',
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
export function _searchUserByName({ username }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/name/${username}`,
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
      return { 
        successful: false 
      };
    });
}

export function _searchUserByName2({ username }) {

  var axios = require('axios');
  var data = JSON.stringify({
  });

  var config = {
    method: 'get',
    url: `http://localhost:8080/users/name?username=${username}`,
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
      return { 
        successful: false 
      };
    });


}

import axios from 'axios';

export function _checkAuth() {

  var axios = require('axios');

  const username = localStorage.getItem('Username');
  const token = localStorage.getItem('Authorization');

  console.log({username, token})

  var data = JSON.stringify({
    "username": username || "",
    "token": token || ""
  });

  var config = {
    method: 'post',
    url: 'http://localhost:8080/auth',
    headers: {},
    data: data
  };

  console.log(config);

  return axios(config)
    .then(function (response) {
      console.log(response.data)
      return response.data;
    })
    .catch(function (response) {
      console.log(response);
      return response.data;
    })
}

export function _login({ username, password }) {

  var axios = require('axios');
  var data = JSON.stringify({
    "username": username,
    "password": password
  });

  var config = {
    method: 'post',
    url: 'http://localhost:8080/auth/login',
    headers: { 'Content-Type': 'application/json' },
    data: data
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function (error) {
      console.log(error);
      return {
        successful: false
      }
    });
}

import Cookies from 'universal-cookie';


export default function HomeService({ values }) {

  var axios = require('axios');
  var data = JSON.stringify({
    "username": values.username,
    "password": values.password
  });

  var config = {
    method: 'post',
    url: process.env.REACT_APP_AUTH_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
      localStorage.setItem('isAdmin', response.data.admin);
      localStorage.setItem('username', response.data.username);
      return true;
    })
    .catch(function (error) {
      return false;
    });
}

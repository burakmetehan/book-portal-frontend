import Cookies from 'universal-cookie';


export default function HomeService({ values }) {

  const cookies = new Cookies();

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

  console.log("HomeService continue");

  return axios(config)
    .then(function (response) {
      cookies.set('Authorization', 'Bearer ' + response.data.token, { path: "/" });
      localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
      return true;
    })
    .catch(function (error) {
      return false;
    });
}

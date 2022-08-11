import axios from "axios";
import React from "react";
import { Cookies } from "react-cookie";

const baseUrl = "localhost:8080/authenticate";

export default function Test2({ values }) {

    var cookies = new Cookies;
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({

    });
    var config = {
        method: 'get',
        url: 'http://localhost:8080/users/',
        headers: {
            'Authorization': cookies.get('Authorization'),
            //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2MDIxODAwOSwiaWF0IjoxNjYwMjAwMDA5fQ.x3cXEoUTBmvVCoo_NLiicfHrMu0-vTD81aBMI3y2kvFbQNVcsH22qeykPG4QuJOOSFlSn9ZJb0BHw8txqn9IxA',
            //'Cookie': 'JSESSIONID=3A421896B5C2B95CAF3480DB33AD3774'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });


}

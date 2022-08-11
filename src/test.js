import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';

const baseUrl = "localhost:8080/authenticate";

export default function Test({ values }) {

    var axios = require('axios');
    //var qs = require('qs');
    var data = JSON.stringify({
        "username": values.username,
        "password": values.password
    });

    var config = {
        method: 'post',
        url: process.env.REACT_APP_AUTH_URL,
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMkB1c2VyLmNvbSIsImV4cCI6MTY2MDIxNzgxOSwiaWF0IjoxNjYwMTk5ODE5fQ.LU79qIq0uKekXLiWG7TGdQDOJiFeYMEmfp5uGnMrmCWsZRBFR-39p-7FzF54tnExFaUmdLqaX-eY7Mo1t-K9nQ', // user
            //'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2MDIxNzc1MiwiaWF0IjoxNjYwMTk5NzUyfQ.1Fkzivp4OYFiit-16CWtIwXURHqFvd-v1-4kem_oB-fs_dGOgbkm7slNZM7H1m6xLTiNHcawKkrA94MRxeBHSw' // admin
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            const cookies = new Cookies();
            cookies.set('Authorization', "Bearer " + response.data.token, {path: "/"});
            console.log(JSON.stringify(response.data));
            // console.log(response.data.token);
            console.log(cookies.get('Authorization'));
        })
        .catch(function (error) {
            console.log(error);
        });
}

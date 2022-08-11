export function _addBook(pagination) {

    var axios = require('axios');
    var data = JSON.stringify({
    });

    var config = {
        method: 'get',
        url: `http://localhost:8080/books?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log("Error in BookService!");
            return;
        });
}
const axios = require('axios').default
var globals = require('./globals').globals

var url = globals.SERVER_URL + '/api'

function getUsers(query) {
    return axios.get(`${url}/users`, { params: query })
}

export {
    getUsers
}
const { Sequelize } = require('sequelize');
var envs = require('../config/envs')

let config = {}

config = {
    dialect: 'mysql',
    port: '3306',
    host: envs.DB_HOST
}

const sequelize = new Sequelize(envs.DB_DATABASE, envs.DB_USERNAME, envs.DB_PASSWORD, config)

module.exports = sequelize
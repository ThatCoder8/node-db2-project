// no need to change this file
const knex = require('knex')
const configs = require('../knexfile')

const environment = process.env.NODE_ENV || 'development'

module.exports = knex(configs[environment])

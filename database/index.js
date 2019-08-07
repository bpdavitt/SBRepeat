const mongoose = require('mongoose');
const config = require('../config.js')

mongoose.connect(config.DBURI, {user: config.DBUSER, pass: config.DBPASS, useNewUrlParser: true}, ()=> {
  console.log('Database connected')
})

module.exports = {};
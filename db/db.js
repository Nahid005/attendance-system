const mongoose = require('mongoose')

function connectDb (connectionStr) {
    return mongoose.connect(connectionStr)
}

module.exports = connectDb
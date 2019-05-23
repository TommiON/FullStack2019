require('dotenv').config()

let port = process.env.PORT
let mongoURL = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
    mongoURL = process.env.MONGODB_TEST_URI
}

module.exports = {port, mongoURL}
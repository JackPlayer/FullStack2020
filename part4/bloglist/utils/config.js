require('dotenv').config()

const { PORT } = process.env
let { MONGODB } = process.env

if (process.env.NODE_ENV === 'test') {
  MONGODB = process.env.MONGODB_TEST
}

module.exports = {
  PORT,
  MONGODB,
}

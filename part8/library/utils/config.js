require('dotenv').config()

const { PORT } = process.env
let { MONGODB } = process.env

module.exports = {
  PORT,
  MONGODB,
}

require('dotenv').config()

const { PORT, MONGODB } = process.env

module.exports = {
  PORT,
  MONGODB,
}

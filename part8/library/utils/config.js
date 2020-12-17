require('dotenv').config()

const { PORT } = process.env
const { MONGODB } = process.env
const { SECRET } = process.env

module.exports = {
  PORT,
  MONGODB,
  SECRET,
}

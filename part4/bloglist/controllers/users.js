const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const result = await User.find({})
  response.json(result)
})

usersRouter.post('/', async (request, response) => {
  const { body } = request

  const saltRounds = 10;
  if (!body.password) {
    return response.status(400).send({ error: 'password was not provided' })
  }
  if (body.password.length < 3) {
    return response.status(400).send({ error: 'password length < 3' })
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    name: body.name,
    username: body.username,
    passwordHash,
  })

  const savedUser = await newUser.save()
  return response.json(savedUser)
})

module.exports = usersRouter

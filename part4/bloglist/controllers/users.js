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
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    name: body.name,
    username: body.username,
    passwordHash,
  })

  const savedUser = await newUser.save()
  response.json(savedUser)
})

module.exports = usersRouter

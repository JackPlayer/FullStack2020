/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id)

  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  return response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const updatedBlog = {
    ...body,
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(update)
})

module.exports = blogsRouter

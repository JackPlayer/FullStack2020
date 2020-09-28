/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  const user = await User.findById(body.userId)
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
  response.json(savedBlog)
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

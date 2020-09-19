const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
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

  const newBlog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })

  const savedBlog = await newBlog.save()
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

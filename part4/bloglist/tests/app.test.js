const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./api_test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('gets the blog objects and has the proper amount of blog objects', async () => {
  const result = await api.get('/api/blogs')

  expect(result.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

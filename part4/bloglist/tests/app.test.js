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

test('has an id field', async () => {
  const result = await api.get('/api/blogs')
  expect(result.body[0].id).toBeDefined()
})

test('valid blog is added to db', async () => {
  const newObject = {
    title: 'The MVP',
    author: 'Elias Petterson',
    url: 'www.petterson.ca',
    likes: 200,
  }
  await api
    .post('/api/blogs')
    .send(newObject)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const endResult = await api.get('/api/blogs')

  const endList = endResult.body.map((blog) => blog.author)

  expect(endList).toHaveLength(helper.initialBlogs.length + 1)
  expect(endList).toContain('Elias Petterson')
})

test('blog with no likes property defaults to 0 likes', async () => {
  const newObject = {
    title: 'Oh Captain, My Captain',
    author: 'Bo Horvat',
    url: 'www.captain.ca',
  }
  await api
    .post('/api/blogs')
    .send(newObject)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const endResult = await api.get('/api/blogs')

  const endList = endResult.body.map((e) => e)
  const addedObject = endList.find((e) => e.author === 'Bo Horvat')
  expect(addedObject.likes).toBeDefined()
  expect(addedObject.likes).toBe(0)
})

test('blog with no url or title', async () => {
  const blogNoURL = {
    title: 'Oh Captain, My Captain',
    author: 'Bo Horvat',
    likes: 50,
  }
  await api
    .post('/api/blogs')
    .send(blogNoURL)
    .expect(400)

  const blogNoTitle = {
    urL: 'www.captain.ca',
    author: 'Bo Horvat',
    likes: 50,
  }

  await api
    .post('/api/blogs')
    .send(blogNoTitle)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})

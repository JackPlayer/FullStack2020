const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('adding to db', () => {
  test('add valid user', async () => {
    const newUser = {
      name: 'Jack',
      username: 'CoolName',
      password: 'abc123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endResult = await api.get('/api/users')

    const endList = endResult.body.map((user) => user.username)

    expect(endList).toHaveLength(1)
    expect(endList).toContain('CoolName')
  })
})

afterAll(() => {
  mongoose.connection.close()
})

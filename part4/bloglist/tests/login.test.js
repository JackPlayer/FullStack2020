const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const newUser = {
    name: 'Jack',
    username: 'CoolName',
    password: 'abc123',
  }

  await api
    .post('/api/users')
    .send(newUser)
})

describe('logging in', () => {
  test('login valid', async () => {
    const loginPayload = {
      username: 'CoolName',
      password: 'abc123',
    }

    const result = await api
      .post('/api/login')
      .send(loginPayload)

    expect(result.body.token).toBeDefined()
    expect(result.body.username).toBe('CoolName')
    expect(result.body.name).toBe('Jack')
  })

  test('login invalid pwd', async () => {
    const loginPayload = {
      username: 'CoolName',
      password: 'testing123',
    }
    const response = await api
      .post('/api/login')
      .send(loginPayload)
      .expect(401)

    expect(response.body.error).toBe('invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})

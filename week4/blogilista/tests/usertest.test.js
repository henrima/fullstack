const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { format, initialBlogs, nonExistingId, blogsInTheDb, usersInDb } = require('./test_helper')


describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users does not succeed with a too short pw', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'ahell',
      name: 'Arto Hellas',
      password: 'ke'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toEqual(usersBeforeOperation.length)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).not.toContain(newUser.username)
  })
})

afterAll(() => {
    server.close()
})
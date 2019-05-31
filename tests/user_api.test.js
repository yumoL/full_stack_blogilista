const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.remove({})

    const userObjects = helper.initialUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

describe('unvalid users cannot be added', () => {
    test('user with too short username cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const userWithTooShortUsername = {
            'username': 'a',
            'name': 'name',
            'password': 'password'
        }
        await api
            .post('/api/users')
            .send(userWithTooShortUsername)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user without username cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const userWithoutUsername = {
            'name': 'name',
            'password': 'password'
        }
        await api
            .post('/api/users')
            .send(userWithoutUsername)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user with too short password cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const userWithTooShortPassword = {
            'username': 'user1',
            'name': 'name',
            'password': 'p'
        }
        await api
            .post('/api/users')
            .send(userWithTooShortPassword)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user without password cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const userWithoutUsername = {
            'username': 'user2',
            'name': 'name'
        }
        await api
            .post('/api/users')
            .send(userWithoutUsername)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user with existed username cannot be added', async () => {
        const usersAtStart = await helper.usersInDb()
        const user = {
            'username': helper.initialUsers[0].username,
            'name': 'name',
            'password': 'hehehe'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
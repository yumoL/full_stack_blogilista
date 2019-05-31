const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('blog-api test', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the number of returned blogs is correct', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('returned blogs have id field', async () => {
        const blogsAtStart = await helper.blogsInDb()
        blogsAtStart.forEach(blog => expect(blog.id).toBeDefined())
    })

    test('a blog can be added', async () => {
        const newBlog = {
            'title': 'Go',
            'author': 'Alex',
            'url': 'www.sina.com',
            'likes': 9
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain('Go')
    })

    test('likes of blog to be added is set to zero if it is undefined', async () => {
        const newBlog = {
            'title': 'Java',
            'author': 'Jarmo',
            'url': 'www.java.com'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const newAddedBlog = blogsAtEnd[blogsAtEnd.length - 1]
        expect(newAddedBlog.title).toBe('Java')
        expect(newAddedBlog.likes).toBe(0)
    })

    test('blogs without url cannot be added', async () => {
        const blogWithoutUrl = {
            'title': 'Java',
            'author': 'Jarmo'
        }
        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400)
    })

    test('blogs without title cannot be added', async () => {
        const blogWithouttitle = {
            'author': 'Jarmo',
            'url': 'www.notitle.com'
        }
        await api
            .post('/api/blogs')
            .send(blogWithouttitle)
            .expect(400)
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

        const ids = blogsAtEnd.map(b => b.id)
        expect(ids).not.toContain(blogToDelete.id)
    })

    test('likes of blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            'author': blogToUpdate.author,
            'title': blogToUpdate.title,
            'url': blogToUpdate.url,
            'likes': blogToUpdate.likes + 10
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 10)
    })
})

afterAll(() => {
    mongoose.connection.close()
})


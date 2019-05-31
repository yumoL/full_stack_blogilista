const mostBlogs = require('../utils/list_helper').mostBlogs
const helper = require('./test_helper')

describe('most blogs', () => {
    test('author with most blogs when list is empty should return null', () => {
        const blogs = []
        expect(mostBlogs(blogs)).toBe(null)
    })
    test('author with most blogs when list is bigger should be correct', () => {
        const biggerBlogs = helper.initialBlogs
        expect(mostBlogs(biggerBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
    })
})
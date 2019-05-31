const mostLikes = require('../utils/list_helper').mostLikes
const helper = require('./test_helper')

describe('most likes', () => {
    test('author with most likes when list is empty should return null', () => {
        const blogs = []
        expect(mostLikes(blogs)).toBe(null)
    })
    test('author with most likes when list is bigger should be correct', () => {
        const biggerBlogs = helper.initialBlogs
        expect(mostLikes(biggerBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    })
})
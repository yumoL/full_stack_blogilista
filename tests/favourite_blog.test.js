const favouriteBlog = require('../utils/list_helper').favouriteBlog
const helper = require('./test_helper')
describe('favourite', () => {
    test('favourite blog of empty list is null', () => {
        const blogs = []
        expect(favouriteBlog(blogs)).toBe(null)
    })

    test('favourite blog of bigger list is found correctly', () => {
        const biggerBlogs = helper.initialBlogs
        const expected = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
        expect(favouriteBlog(biggerBlogs)).toEqual(expected)
    })
})
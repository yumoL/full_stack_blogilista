const totalLikes = require('../utils/list_helper').totalLikes
const helper = require('./test_helper')

describe('average', () => {
    test('total likes of empty list is zero', () => {
        const blogs = []
        expect(totalLikes(blogs)).toBe(0)
    })

    test('total likes when list has only one blog equals the likes of the blog', () => {
        const oneBlog = [
            {
                _id: '5a422a851b54a676234d17f7',
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 7,
                __v: 0
            }
        ]
        expect(totalLikes(oneBlog)).toBe(7)
    })

    test('total likes of a bigger list is calculated right', () => {
        const biggerBlogs = helper.initialBlogs
        expect(totalLikes(biggerBlogs)).toBe(36)
    })
})
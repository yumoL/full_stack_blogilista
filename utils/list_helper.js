const loadash = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.map(b => b.likes).reduce((a, b) => {
        return a + b
    }, 0)
    return total
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let maxIndex = 0
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > blogs[maxIndex].likes) {
            maxIndex = i
        }
    }
    let max = blogs[maxIndex]
    return { title: max.title, author: max.author, likes: max.likes }
}

const maxIndex = (arr) => {
    let maxIndex = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] > arr[maxIndex][1]) {
            maxIndex = i
        }
    }
    return maxIndex
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const basedOnAuthor = loadash.groupBy(blogs, 'author')
    const blogsOfAuthors = loadash.mapValues(basedOnAuthor, function (o) {
        return o.length
    })
    const arr = loadash.toPairs(blogsOfAuthors)
    let maxIdx = maxIndex(arr)
    return {
        author: arr[maxIdx][0],
        blogs: arr[maxIdx][1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const basedOnAuthor = loadash.groupBy(blogs, 'author')
    const likesOfAuthors = loadash.mapValues(basedOnAuthor, function (o) {
        let sum = 0
        for (let i = 0; i < o.length; i++) {
            sum += o[i].likes
        }
        return sum
    })
    const arr = loadash.toPairs(likesOfAuthors)
    let maxIdx = maxIndex(arr)
    return {
        author: arr[maxIdx][0],
        likes: arr[maxIdx][1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
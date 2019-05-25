const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, x) => sum + x
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const max = likes.reduce(function(a, b) {
        return Math.max(a, b)
    })
    const topBlog = blogs.find(blog => blog.likes === max)
    return topBlog
}

const mostBlogs = (blogs) => {
    const kirjoitukset = blogs.map(blog => blog.author)
    const frek = lodash.countBy(kirjoitukset)
    console.log(frek)
    
}

  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
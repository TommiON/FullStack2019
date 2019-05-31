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
    const blogeja = Object.values(frek)
    const max = blogeja.reduce(function(a,b) {
        return Math.max(a,b)
    })
    const maxIndex = blogeja.findIndex(x => x === max)
    const kirjoittajat = Object.keys(frek)
    const ahkerin = kirjoittajat[maxIndex]
    const palautus = {
        author: ahkerin,
        blogs: max
      }
    console.log(palautus)
    return palautus
}

// jäi kesken
const mostLikes = (blogs) => {
  
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
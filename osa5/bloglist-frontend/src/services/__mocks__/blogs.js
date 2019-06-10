const blogs = [
    {
        title: 'Vielä yksi testiblogi',
        author: 'joku',
        url: 'joku osoite',
        likes: 11
    },
    {
        title: 'mockblogi',
        author: 'mockkirjoittaja',
        url: 'joku osoite',
        likes: 0
    }
]

const getAll = () => {
    console.log('Mock-blogs: käydäänkö täällä lainkaan?')
    return Promise.resolve(blogs)
    // return blogs
}

export default { getAll }
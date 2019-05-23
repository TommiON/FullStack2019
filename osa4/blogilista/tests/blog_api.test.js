const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const testBlogs = [
    {
        _id: "5ce184a20155314cf60f79e5",
        title: "xxx",
        author: "yyy",
        url: "zzz",
        likes: 1,
        __v: 0
        },
        {
        _id: "5ce1872d11c6c04ec0a5b93d",
        title: "toinen blogi",
        author: "toinen tekijä",
        url: "toinen osoite",
        likes: 0,
        __v: 0
        }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogi = new Blog(testBlogs[0])
    await blogi.save()
    blogi = new Blog(testBlogs[1])
    await blogi.save()
})

test('Oikea määrä blogeja JSON-muodossa', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const saadutBlogit = await api.get('/api/blogs')
    expect(saadutBlogit.body.length).toBe(2)
})

afterAll(() => {
    mongoose.connection.close()
  })
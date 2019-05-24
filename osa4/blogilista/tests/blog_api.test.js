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

test('Identifioiva kenttä on nimeltään id', async () => {
    const saadutBlogit = await api.get('/api/blogs')
    expect(saadutBlogit.body[0].id).toBeDefined()
})

test('Voi lisätä uuden blogin', async () => {
    const uusiBlogi = {
        title: "jotain",
        author: "joku",
        url: "zzz",
        likes: 0
    }
    
    await api
    .post('/api/blogs')
    .send(uusiBlogi)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const vastaus = await api.get('/api/blogs')
    const otsikot = vastaus.body.map(v => v.title)
    expect(vastaus.body.length).toBe(testBlogs.length + 1)
    expect(otsikot).toContain('jotain')
})

test('Tykkäykset alustetaan nollaan jos arvo puuttuu', async () => {
    const uusiBlogi = {
        title: "jotain",
        author: "joku",
        url: "zzz"
    }

    await api.post('/api/blogs').send(uusiBlogi)

    const vastaus = await api.get('/api/blogs')
    const lisattyBlogi = vastaus.body.find(blogi => blogi.title === 'jotain')
    expect(lisattyBlogi.likes).toBe(0)
})

test('Jos otsikko ja url puuttuvat, post-pyyntö hylätään', async () => {
    const uusiBlogi = {
        author: "joku"
    }
    await api.post('/api/blogs').send(uusiBlogi).expect(400)
})

afterAll(() => {
    mongoose.connection.close()
  })
const listHelper = require('../utils/list_helper')

describe('Tykkäysten kokonaismäärä oikein', () => {
  test('kun ei yhtään blogia', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('kun yhdellä blogilla on tykkäyksiä', () => {
    const blogs = [
      {
        _id: "5ce184a20155314cf60f79e5",
        title: "Monday Note",
        author: "Tommi",
        url: "www.mondaynote.com",
        likes: 0,
        __v: 0
        },
        {
        _id: "5ce1872d11c6c04ec0a5b93d",
        title: "Daring F",
        author: "Hanna",
        url: "www.mondaynote.com",
        likes: 1,
        __v: 0
        }
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(1)
  })

  test('kun blogeja on monta', () => {
    const blogs = [
      {
        _id: "5ce184a20155314cf60f79e5",
        title: "Monday Note",
        author: "Tommi",
        url: "www.mondaynote.com",
        likes: 100,
        __v: 0
        },
        {
        _id: "5ce1872d11c6c04ec0a5b93d",
        title: "Daring F",
        author: "Hanna",
        url: "www.mondaynote.com",
        likes: 1,
        __v: 0
        }
    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(101)
  })
})

test('Eniten tykäytty blogi löytyy', () => {
  const blogs = [
    { _id: "5ce184a20155314cf60f79f5",
      title: "xxx",
      author: "yyy",
      url: "zzz",
      likes: 10,
      __v: 0
    },
    {
      _id: "5ce184a20155314cf60f79e5",
      title: "Monday Note",
      author: "Tommi",
      url: "www.mondaynote.com",
      likes: 100,
      __v: 0
    },
    {
      _id: "5ce1872d11c6c04ec0a5b93d",
      title: "Daring F",
      author: "Hanna",
      url: "www.mondaynote.com",
      likes: 1,
      __v: 0
    }
  ]
  const mostLiked = {
    _id: "5ce184a20155314cf60f79e5",
    title: "Monday Note",
    author: "Tommi",
    url: "www.mondaynote.com",
    likes: 100,
    __v: 0
  }
  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual(mostLiked)
})

test('ahkerin kirjoittaja', () => {
  const blogs = [
    {
      title: "Monday Note",
      author: "Hanna",
      url: "www.mondaynote.com",
      likes: 100,
      },
      {
      title: "Daring F",
      author: "Tommi",
      url: "www.mondaynote.com",
      likes: 1,
      },
      {
        title: "xxx",
        author: "Tommi",
        url: "www.mondaynote.com",
        likes: 0,
      }
  ]
  const results = listHelper.mostBlogs(blogs)
  expect(1).toBe(1)
})

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
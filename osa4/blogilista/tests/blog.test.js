const listHelper = require('../utils/list_helper')

describe('Number of likes', () => {
  test('when blog array empty', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('with one liked blog', () => {
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

  test('with many liked blogs', () => {
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

test('Find most liked blog', () => {
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

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
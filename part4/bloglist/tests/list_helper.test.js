const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const blogListWithOne = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  const blogListWithMany = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 500,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 200,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 22,
      __v: 0,
    },
  ]

  test('of empty empty list is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of 1 blog is likes of that', () => {
    const result = listHelper.totalLikes(blogListWithOne)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(blogListWithMany)
    expect(result).toBe(722)
  })
})

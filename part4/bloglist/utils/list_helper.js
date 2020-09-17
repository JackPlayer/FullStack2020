const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach((blog) => {
    total += blog.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  let favorite = {}

  blogs.forEach((blog) => {
    if (!favorite.likes || blog.likes > favorite.likes) {
      favorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  const numberOfBlogsList = []

  blogs.forEach((blog) => {
    const isAdded = numberOfBlogsList.filter((elem) => blog.author === elem.author).length > 0
    if (isAdded) {
      numberOfBlogsList.forEach((elem) => {
        if (elem.author === blog.author) {
          elem.blogs += 1
        }
      })
    } else {
      const newElem = {
        author: blog.author,
        blogs: 1,
      }
      numberOfBlogsList.push(newElem)
    }
  })
  let topBlogger = {}
  numberOfBlogsList.forEach((blogger) => {
    if (Object.keys(topBlogger).length === 0 || blogger.blogs > topBlogger.blogs) {
      topBlogger = {
        ...blogger,
      }
    }
  })
  return topBlogger
}

const mostLikes = (blogs) => {
  const numberOfLikesList = []

  blogs.forEach((blog) => {
    const isAdded = numberOfLikesList.filter((elem) => blog.author === elem.author).length > 0
    if (isAdded) {
      numberOfLikesList.forEach((elem) => {
        if (elem.author === blog.author) {
          elem.likes += blog.likes
        }
      })
    } else {
      const newElem = {
        author: blog.author,
        likes: blog.likes,
      }
      numberOfLikesList.push(newElem)
    }
  })

  let topBlogger = {}
  numberOfLikesList.forEach((blogger) => {
    if (Object.keys(topBlogger).length === 0 || blogger.likes > topBlogger.likes) {
      topBlogger = {
        ...blogger,
      }
    }
  })
  return topBlogger
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

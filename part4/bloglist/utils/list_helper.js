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

module.exports = {
  totalLikes,
  favoriteBlog,
}

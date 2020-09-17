const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach((blog) => {
    total += blog.likes
  })

  return total
}

module.exports = {
  totalLikes,
}

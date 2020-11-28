import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => -(a.likes - b.likes))
  const renderedBlogs = sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)

  return (
    <div id="blog-list">
      <h2>Blogs</h2>
      {renderedBlogs}
    </div>
  )
}

export default BlogList
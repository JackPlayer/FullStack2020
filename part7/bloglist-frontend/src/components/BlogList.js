import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => -(a.likes - b.likes))
  const blogList = sortedBlogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)

  return (
    <div id="blog-list">
      <h2>Blogs</h2>
      <ul>
        {blogList}
      </ul>
    </div>
  )
}

export default BlogList
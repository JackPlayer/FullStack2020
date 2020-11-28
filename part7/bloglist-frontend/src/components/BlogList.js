import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => -(a.likes - b.likes))
  const blogList = sortedBlogs.map(blog => <li key={blog.id}><h4><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></h4></li>)

  return (
    <div id="blog-list" className="section container content">
      <h2>Blogs</h2>
      <ul className="block-list">
        {blogList}
      </ul>
    </div>
  )
}

export default BlogList
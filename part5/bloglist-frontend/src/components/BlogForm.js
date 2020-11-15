import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
  const [url, setURL] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    createBlog({
      url,
      title,
      author,
    })

    setAuthor('')
    setTitle('')
    setURL('')
  }
  
  return (
    <div id="create-blog">
        <h2>Create New</h2>
        <form onSubmit={addBlog}>
          <label>Title: </label> <input type="text" value={title} onChange={({target}) => {setTitle(target.value)}}></input>
          <br></br>
          <label>Author: </label> <input type="text" value={author} onChange={({target}) => {setAuthor(target.value)}}></input>
          <br></br>
          <label>URL: </label> <input type="text" value={url} onChange={({target}) => {setURL(target.value)}}></input>
          <br></br>
          <button type="submit">Create</button>
        </form>
      </div>
    
  )
}

export default BlogForm

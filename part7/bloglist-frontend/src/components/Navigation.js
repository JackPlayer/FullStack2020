import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {

  return (
    <div className="navigation tabs is-centered is-medium">
      <ul>
        <li className="is-active" data-tab="1"><Link to="/" >Blogs</Link></li>
        <li data-tab="2"><Link to="/create" >Create</Link></li>
        <li data-tab="3"><Link to="/users" >Users</Link></li>
      </ul>
    </div>
  )
}

export default Navigation
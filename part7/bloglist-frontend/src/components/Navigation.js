import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {

  const handleClick = (e) => {
    const parent = e.currentTarget.parentNode
    for (let i = 0; i < parent.children.length; i++) {
      parent.children[i].className=''
    }
    e.currentTarget.className += ' is-active'

  }
  return (
    <div className="navigation tabs is-centered is-medium">
      <ul className="nav-list">
        <li className='is-active' data-tab="0" onClick={handleClick}><Link to="/blogs" >Blogs</Link></li>
        <li data-tab="1" onClick={handleClick}><Link to="/create">Create</Link></li>
        <li data-tab="2" onClick={handleClick}><Link to="/users">Users</Link></li>
      </ul>
    </div>
  )
}

export default Navigation
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let blogEntry = {
    title: "Blog Test",
    author: "JPlay",
    likes: 1000,
    url: "www.test.com",
    user: {
      username: "JPlay"
    }
  }
  let mockUpdate
  let mockRemove
  let component

  beforeEach(() => {
    mockUpdate = jest.fn()
    mockRemove = jest.fn()
    component = render(<Blog blog={blogEntry} updateBlog={mockUpdate} removeBlog={mockRemove} username="JPlay"/>)
  })
  test('Contains title and author', () => {
    const author = component.container.querySelector(".blog-author")
    const title = component.container.querySelector(".blog-title")

    expect(author).toHaveTextContent('JPlay')
    expect(title).toHaveTextContent('Blog Test')
  })

  test('Does not render likes and url by default', () => {
    const likes = component.container.querySelector(".blog-likes")
    const url = component.container.querySelector(".blog-url")

    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test('url and likes render when view button pressed', () => {
    const viewButton = component.container.querySelector('button')

    fireEvent.click(viewButton)
    const toggleDiv = component.container.querySelector('.toggleableDiv')
    const likes = component.container.querySelector(".blog-likes")
    const url = component.container.querySelector(".blog-url")

    expect(toggleDiv).toHaveStyle("display: block")
    expect(url).toHaveTextContent('www.test.com')
    expect(likes).toHaveTextContent('1000')

  })

  test('like button pressed twice', () => {
    const viewButton = component.container.querySelector('button')
    fireEvent.click(viewButton)

    const likeButton = component.getByText("Like")

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})
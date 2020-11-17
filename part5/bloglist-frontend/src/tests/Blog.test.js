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
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  let mockCreate
  let component

  beforeEach(() => {
    mockCreate = jest.fn()

    component = render(<BlogForm createBlog={mockCreate} />)
  })
  test('Function is called with correct values when submit is clicked', () =>{
    const inputs = component.container.querySelectorAll("input")
    const form = component.container.querySelector("form")
    const title = inputs[0]
    const author = inputs[1]
    const url = inputs[2]

    fireEvent.change(title, {
      target:{value: "new title"}
    })

    fireEvent.change(author, {
      target:{value: "new author"}
    })

    fireEvent.change(url, {
      target:{value: "new url"}
    })

    fireEvent.submit(form)

    expect(mockCreate.mock.calls).toHaveLength(1)
  })
})

import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'



const Books = (props) => {
  const booksResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  const renderBooksTable = () => {
    if (booksResult.loading) {
      return (
        <p>Loading...</p>
      )
    }

    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksResult.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
     
    )
  }

  return (
    <div>
        <h2>books</h2>
        { renderBooksTable() }
    </div>
  )
  
}

export default Books
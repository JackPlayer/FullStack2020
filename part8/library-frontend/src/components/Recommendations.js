import React from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_FOR_ME } from '../queries/queries'
import { ME } from '../queries/queries'

const Recommendations = (props) => {
  const booksResult = useQuery(BOOKS_FOR_ME)
  const userResult = useQuery(ME)
  if (!props.show) {
    return null
  }
  
  const renderTable = () => {
    if (booksResult.loading) return <p>Loading...</p>
    if (userResult.loading) return <p>Loading...</p>

    const booksRendered = booksResult.data.booksForMe.map((book) => {
      return (
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      )  
    })
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {booksRendered}
        </tbody>
      </table>
    )
  }
  const genre = userResult.loading ? 'N/A' : userResult.data.me.favoriteGenre
  return (
    <div>
      <h2>recommendations</h2>
      {!userResult.loading  && <p>books in your favorite genre <strong>{genre}</strong></p>}
      {renderTable()}
    </div>
  )
}

export default Recommendations
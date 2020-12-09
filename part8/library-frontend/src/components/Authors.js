  
import React from 'react'
import BirthYearForm from './BirthYearForm'
import { ALL_AUTHORS } from '../queries/queries'
import { useQuery } from '@apollo/client'

const Authors = (props) => {
  const authorsResult = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }


  const renderAuthorsTable = () => {
    if (authorsResult.loading) {
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
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorsResult.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <h2>authors</h2>
      { renderAuthorsTable() }
      <BirthYearForm />
    </div>
  )
}

export default Authors

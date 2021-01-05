import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'



const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const booksResult = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  const renderSelector = () => {
    if(!booksResult.loading) {
      const books = booksResult.data.allBooks;
      const select = ['all']
      
      books.forEach((book) => {
        const genres = book.genres;

        genres.forEach((genre) =>{
          if (!select.includes(genre)) select.push(genre)
        })
      })

      const selectRender = select.map((selectItem) => {
        return (
          <option key={selectItem} value={selectItem}>{selectItem}</option>
        )
      })
      return (
        <select onChange={(e) => setGenre(e.target.value)}>
          {selectRender}
        </select>
      )
    }
    return (
      <select><option>Loading...</option></select>
    )
    
  }
  const renderBooksTable = () => {
    if (booksResult.loading) {
      return (
        <p>Loading...</p>
      )
    }
    const books = booksResult.data.allBooks;
    const booksToRender = (genre === 'all') ? books : books.filter((book) => book.genres.includes(genre))
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
          {booksToRender && booksToRender.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
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
        { renderSelector() }
        { renderBooksTable() }
    </div>
  )
  
}

export default Books
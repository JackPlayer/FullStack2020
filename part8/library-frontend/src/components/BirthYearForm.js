import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { MODIFY_AUTHOR, ALL_AUTHORS } from '../queries/queries'

const BirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authorsResult = useQuery(ALL_AUTHORS)
  const [ modifyBirthYear ] = useMutation(MODIFY_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      console.log("An error has occured changing the birth year")
    }
  })

  useEffect(() => {
    if (!authorsResult.loading && authorsResult.data.allAuthors.length > 0) setName(authorsResult.data.allAuthors[0].name)

  }, [authorsResult, setName])
  const handleUpdate = (event) => {
      event.preventDefault()
     
      if (name === '' || born === '') return
      modifyBirthYear({variables: {name, born: Number(born)}})
      setBorn('')
  }

  const renderSelector = () => {
    if (authorsResult.loading) {
      return <p>Loading...</p>
    }
    
    const options = authorsResult.data.allAuthors.map((author) => 
      <option key={author.name} value={author.name}>{author.name}</option>
    )


    return (
      <select onChange={({target}) => setName(target.value)}>
        {options}
      </select>
    )
  }
  return (
    <div id="birth-year-form">
      <h2>Set birth year</h2>
      <form onSubmit={handleUpdate}>
        {renderSelector()}
        <br></br>
        <label>Born: </label>
        <input type="number" onChange={({target}) => setBorn(target.value)}/>
        <br></br>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default BirthYearForm

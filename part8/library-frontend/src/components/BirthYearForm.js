import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { MODIFY_AUTHOR, ALL_AUTHORS } from '../queries/queries'

const BirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ modifyBirthYear ] = useMutation(MODIFY_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      console.log("An error has occured changing the birth year")
    }
  })

  const handleUpdate = (event) => {
      event.preventDefault()
     
      if (name === '' || born === '') return
      modifyBirthYear({variables: {name, born: Number(born)}})
      setName('')
      setBorn('')
  }

  return (
    <div id="birth-year-form">
      <h2>Set birth year</h2>
      <form onSubmit={handleUpdate}>
        <label>Name: </label>
        <input type="text" onChange={({target}) => setName(target.value)}/>
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

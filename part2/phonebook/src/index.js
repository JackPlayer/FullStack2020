import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import personsService from './services/personsService'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter]  = useState('')

  const endpoint = "http://localhost:3001/persons"
  console.log(persons)
  useEffect(() => {
    personsService
      .getAll()
      .then((personsData) => {
        setPersons(personsData)
      })
  }, [])

  const handleAddEntry = (e) => {
    e.preventDefault();

    let alreadyExists = false
    persons.forEach((person) => {
      if (person.name === newName) {
        window.alert(`${person.name} is already added to the phonebook`)
        alreadyExists = true
      }
    })

    if (newName === '' || newNumber === '') {
      window.alert('One or both of the fields are blank')
    }

    if (alreadyExists || newName === '' || newNumber === '') { 
      setNewName('')
      setNewNumber('')  
      return 
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      date: new Date()
    }
    
    personsService
      .create(newPerson)
      .then((newEntry) => {
        setPersons(persons.concat(newEntry))
        setNewNumber('')
        setNewName('')
      })
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add New</h2>
      <PersonForm onSubmit={handleAddEntry} onChangeName={(e) => setNewName(e.target.value)} onChangeNumber={(e) => setNewNumber(e.target.value)} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
export default App
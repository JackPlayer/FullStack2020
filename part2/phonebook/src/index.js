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


  const handleDelete = (e) => {
    const id = e.target.getAttribute('person_id')

    if (
      window.confirm(`Delete ${persons.find((person) => person.id === parseInt(id)).name}?`)
    ) {
      personsService.remove(id)
                    .then((res) => {
                      const newPersons = persons.filter((person) => person.id !== parseInt(id))
                      setPersons(newPersons)
                    })
    }
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add New</h2>
      <PersonForm onSubmit={handleAddEntry} onChangeName={(e) => setNewName(e.target.value)} onChangeNumber={(e) => setNewNumber(e.target.value)} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons onClick={handleDelete} persons={persons} filter={filter} />
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
export default App
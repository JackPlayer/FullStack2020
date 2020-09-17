import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import personsService from './services/personsService'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Message from './components/Message'

import './style.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ updateMessage, setUpdateMessage] = useState({message: "", type: "normal"}) 
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
    
    if (newName === '' || newNumber === '') {
      window.alert('One or both of the fields are blank')
      return
    }

    let alreadyExists = false
    // Loop through persons
    persons.forEach((person) => {

      // Name already exists in the database
      if (person.name === newName) {
        alreadyExists = true

        // Ask to confirm if the number should be updated
        if (
          window.confirm(`${person.name} is already added to the phonebook. Replace the old number with the new one?`)
        ) {

          const changedPerson = {...person, number: newNumber}

          // Update the number entry in the database
          personsService.update(person.id, changedPerson)
                        .then((updatedPerson) => {
                          // Update the persons list and re-render
                          setPersons(persons.map((p) => p.id !== updatedPerson.id ? p : updatedPerson))
                          setNewNumber('')
                          setNewName('')
                          setUpdateMessage({message: `${updatedPerson.name} has updated their number to ${updatedPerson.number}`, type: 'normal'})
                        })
                        .catch((err) => {
                          console.log(err.response.data)
                          setUpdateMessage({message: `Error: ${person.name} entry could not be updated. ${err.response.data.error}`, type: "error"})
                        })
        }
      }
    })

    if (alreadyExists) return 

    const newPerson = {
      name: newName,
      number: newNumber,
      date: new Date()
    }
    
    personsService
      .create(newPerson)
      .then((newEntry) => {
        setPersons(persons.concat(newEntry))
        setUpdateMessage({message: `${newPerson.name} has been added`, type: 'normal'})
        setNewNumber('')
        setNewName('')
      })
      .catch((error) => {
        console.log(error.response.data)
        setUpdateMessage({message: `${error.response.data.error}`, type: 'error'})
      })
    
  }


  const handleDelete = (e) => {
    const id = e.target.getAttribute('person_id')
    
    if (
      window.confirm(`Delete ${persons.find((person) => person.id === id).name}?`)
    ) {
      personsService.remove(id)
                    .then((res) => {
                      const newPersons = persons.filter((person) => person.id !== id)
                      setPersons(newPersons)
                    })
                    .catch((err) => {
                      setUpdateMessage({message: `Error deleting person with ID: ${id}`, type: "error"})
                    })
    }
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={updateMessage} errorMessageController={() => setUpdateMessage({...updateMessage, message: ''})} timeout={3000}/>
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
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Jack Player', number: "250-555-5555"}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter]  = useState('')

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
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewNumber('')
    setNewName('')
  }
  return (
    <div>
      <h1>Phonebook</h1>

      <div>
        Filter: <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <h2>Add New</h2>
      <form onSubmit={handleAddEntry}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          // Filter out names that don't match the filter. Map to list item
          persons.filter((person) => person.name.includes(filter)).map((person) => {
            return <li key={person.name}>{person.name} {person.number}</li>
          })
        }
      </ul>
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
export default App
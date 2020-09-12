import React from 'react'

const Persons = ({persons, filter}) => {

    return (
        <ul>
            {
            // Filter out names that don't match the filter. Map to list item
            persons.filter((person) => person.name.includes(filter)).map((person) => {
                return <li key={person.name}>{person.name} {person.number}</li>
            })
            }
      </ul> 
    )
}

export default Persons
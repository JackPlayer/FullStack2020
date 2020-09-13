import React from 'react'

const Persons = ({persons, filter, onClick}) => {

    return (
        <ul>
            {
            // Filter out names that don't match the filter. Map to list item
            persons.filter((person) => person.name.includes(filter)).map((person) => {
                return (
                    <div key={person.id} className="person" style={{display: 'flex', flexDirection: 'row', alignItems: "center", marginTop: "10px"}}>
                        <p>{person.name} {person.number}</p>
                        <button onClick={onClick} person_id={person.id} style={{marginLeft: "10px", fontSize: "0.7rem", height: "50%"}}>Delete</button>
                    </div>
                    
                )
            })
            }
      </ul> 
    )
}

export default Persons
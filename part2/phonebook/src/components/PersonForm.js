import React from 'react'

const PersonForm = ({onSubmit, onChangeName, onChangeNumber, newName, newNumber}) => {

    return (
    <form onSubmit={onSubmit}>
        <div>
          Name: <input value={newName} onChange={onChangeName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


export default PersonForm
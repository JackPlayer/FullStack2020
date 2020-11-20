import React from 'react'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const input = event.target.value
    
    dispatch(updateFilter(input))
    
  }
  return (
    <div id="filter">
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
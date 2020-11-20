import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    const input = event.target.value
    
    props.updateFilter(input)
    
  }
  return (
    <div id="filter">
      Filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  updateFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
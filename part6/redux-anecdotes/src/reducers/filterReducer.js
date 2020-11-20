/**
 * Redux filter reducer
 */
const filterReducer = (state = "", action) => {
  switch(action.type) {
    case 'SET_FILTER':
      const newState = action.data.filter
      return newState
    default: 
      return state
  }
}

/**
 * Sets the filter 
 */
export const updateFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: { filter }
  }
}

export default filterReducer; 
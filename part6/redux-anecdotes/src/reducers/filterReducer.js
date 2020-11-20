const filterReducer = (state = "", action) => {
  switch(action.type) {
    case 'SET_FILTER':
      const newState = action.data.filter
      return newState
    default: 
      return state
  }
}

export const updateFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: { filter }
  }
}

export default filterReducer; 
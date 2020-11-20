const filterReducer = (state = "", action) => {
  switch(action.type) {
    case 'SET':
      const newState = action.data.filter
      return newState
    default: 
      return state
  }
}

export const updateFilter = (filter) => {
  return {
    type: 'SET',
    data: { filter }
  }
}

export default filterReducer; 
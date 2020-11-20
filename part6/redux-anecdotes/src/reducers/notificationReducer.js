const notificationReducer = (state = "", action) => {
  switch(action.type) {
    case 'NEW':
      const newState = action.data.notification
      return newState
    case 'REMOVE':
      return ""
    default: 
      return state
  }
}

export const newNotification = (notification) => {
  return {
    type: 'NEW',
    data: { notification }
  }
}

export const removeNotification = (notification) => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer; 
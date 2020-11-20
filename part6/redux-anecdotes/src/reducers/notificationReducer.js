const notificationReducer = (state = "", action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      const newState = action.data.notification
      return newState
    case 'REMOVE_NOTIFICATION':
      return ""
    default: 
      return state
  }
}

export const newNotification = (notification, timeout) => {
  return async (dispatch, getState) => {
    dispatch ({
      type: 'NEW_NOTIFICATION',
      data: { notification }
    })

    setTimeout(() => {
      const currNotification = getState().notification
      
      if (currNotification === notification) dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer; 
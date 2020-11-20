import React, { useEffect } from 'react'
import { removeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'


const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification)
    }, 5000)
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
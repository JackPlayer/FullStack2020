import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Notification Component shows a notification when invoked and
 * hides after timeout ms
 * @param {*} props The props passed into the component
 */
const Notification = ({ content, timeout, timeoutFunc }) => {

  const style = {
    'width': '100%',
    'padding': '2rem',
    'color': 'black',
    'border': '3px solid black',
    'backgroundColor': '#BBB',
  }

  /**
   * called when the component is updated
   */
  useEffect(() => {
    setTimeout(() => {
      timeoutFunc()
    }, timeout)
  }, [timeoutFunc, timeout])


  return (
    <div className="notification" style={style}>
      {content}
    </div>
  )
}

export default Notification

Notification.propTypes = {
  content: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  
}
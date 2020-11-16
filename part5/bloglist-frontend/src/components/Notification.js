import React, {useEffect, useState} from 'react'

/**
 * Notification Component shows a notification when invoked and 
 * hides after timeout ms
 * @param {*} props The props passed into the component 
 */
const Notification = ({ content, timeout}) => {

  const [style, setStyle] = useState( {
    'width': "100%",
    'padding': "2rem",
    'color': 'black',
    'border': '3px solid black',
    'backgroundColor': '#BBB'
  })

  /**
   * Timeout is initiated when the first render occurs
   */
  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        ...style, 
        'display': 'none'
      }

      setStyle(newStyle)
    }, timeout)
  }, [style, timeout])


  return (
    <div className="notification" style={style}>
      {content}
    </div>
  )
}

export default Notification

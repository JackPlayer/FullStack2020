import React, {useEffect, useState} from 'react'

const Notification = ({ content, timeout}) => {

  const [style, setStyle] = useState( {
    'width': "100%",
    'padding': "2rem",
    'color': 'black',
    'border': '3px solid black',
    'backgroundColor': '#BBB'
  })
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

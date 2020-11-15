import React, {useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef((props, ref) => {
  const [toggledStyle, setToggledStyle] = useState({"display": "none"})

  const toggle = () => {
    if (toggledStyle.display === "none") {
      setToggledStyle({"display": "block"})
    } else {
      setToggledStyle({"display": "none"})
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })

  const mainButtonStyle = toggledStyle.display === "block" ? {"display" : "none"} : {"display": "block"}

  return (
    <>
      <button onClick={toggle} style ={mainButtonStyle}>{props.buttonPrompt}</button>
      <div style={toggledStyle}>
          {props.children}
          <button onClick={toggle}>Cancel</button>
      </div>
      
    </>
    
  )
})
export default Toggleable

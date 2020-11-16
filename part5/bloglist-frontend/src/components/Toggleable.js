import React, {useState, useImperativeHandle } from 'react'

/**
 * Toggleable Component allows its children to be toggled on and off
 * Contains props.children
 */
const Toggleable = React.forwardRef((props, ref) => {
  const [toggledStyle, setToggledStyle] = useState({"display": "none"})

  /**
   * Handles the toggling functionality 
   * This function can be passed with imperative handle to its parent. 
   * Allows the parent to control the toggle as well
   */
  const toggle = () => {
    if (toggledStyle.display === "none") {
      setToggledStyle({"display": "block"})
    } else {
      setToggledStyle({"display": "none"})
    }
  }

  /**
   * Gives parents the ability to control the toggle function
   */
  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })

  // Top Button (On by default)
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

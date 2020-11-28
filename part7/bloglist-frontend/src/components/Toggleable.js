import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Toggleable Component allows its children to be toggled on and off
 * Contains props.children
 */
const Toggleable = (props) => {
  const [toggledStyle, setToggledStyle] = useState({ 'display': 'none' })

  /**
   * Handles the toggling functionality
   * This function can be passed with imperative handle to its parent.
   * Allows the parent to control the toggle as well
   */
  const toggle = () => {
    if (toggledStyle.display === 'none') {
      setToggledStyle({ 'display': 'block' })
    } else {
      setToggledStyle({ 'display': 'none' })
    }
  }


  // Top Button (On by default)
  const mainButtonStyle = toggledStyle.display === 'block' ? { 'display' : 'none' } : { 'display': 'block' }

  const shouldRenderChildren = toggledStyle.display === 'block'
  return (
    <>
      <button onClick={toggle} className="btn-toggle" style ={mainButtonStyle}>{props.buttonPrompt}</button>
      <div style={toggledStyle} className="toggleableDiv">
        {shouldRenderChildren && props.children}
        {shouldRenderChildren && <button onClick={toggle}>Cancel</button> }
      </div>
    </>
  )
}

export default Toggleable

Toggleable.propTypes = {
  children: PropTypes.node.isRequired,
  buttonPrompt: PropTypes.string.isRequired,
}
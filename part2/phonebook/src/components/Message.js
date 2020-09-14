import React from 'react'

const Message = ({message, color, timeout, errorMessageController}) => {
    if (message === '') return null
    const messageStyle = {
        height: "2%",
        color,
        border: `3px solid ${color}`,
        padding: "0.5rem",
        margin: "10px",
        display: "block"
    }

    setTimeout((() => errorMessageController()), timeout)

    return (
        <div id="message" style={messageStyle}>
            <p>{message}</p>    
        </div>
    )
}

export default Message
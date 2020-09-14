import React from 'react'

const Message = ({message, timeout, errorMessageController}) => {
    if (message.message === '') return null
    
    const color = (message.type === 'normal') ? 'green': 'darkred' 
    
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
            <p>{message.message}</p>    
        </div>
    )
}

export default Message
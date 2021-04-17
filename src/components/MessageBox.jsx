import React from 'react'

function MessageBox(props) {

    return (
        <div className={`message-box ${props.variant}-message`} >
            {props.children}
        </div>
    )
}

export default MessageBox

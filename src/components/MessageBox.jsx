import React from 'react'

function MessageBox(props) {
    return (
        <div>
            {props.children.message}
        </div>
    )
}

export default MessageBox

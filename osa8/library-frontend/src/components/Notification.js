import React from 'react'

const Notification = (props) => {
    
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 0,
        color: 'green',
    }

    return (
        <div style={style}>
          {props.message}
        </div>
    )

}

export default Notification
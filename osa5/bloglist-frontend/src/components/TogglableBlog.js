import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TogglableBlog = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
          <div style={hideWhenVisible}>
            <h3 onClick={toggleVisibility}>{props.labelText}</h3>
          </div>
          <div style={showWhenVisible}>
            <h3 onClick={toggleVisibility}>{props.labelText}</h3>
            {props.children}
            </div>
        </div>
      )
}

TogglableBlog.propTypes = {
  labelText: PropTypes.string.isRequired
}

export default TogglableBlog
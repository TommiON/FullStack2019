import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TogglableForm = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.labelForShow}</button>
          </div>
          <div style={showWhenVisible}>
            <button onClick={toggleVisibility}>{props.labelForHide}</button>
            {props.children}
            </div>
        </div>
      )
}

TogglableForm.proptypes = {
  labelForHide: PropTypes.string.isRequired,
  labelForShow: PropTypes.string.isRequired
}

export default TogglableForm
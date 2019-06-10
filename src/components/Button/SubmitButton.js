import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const SubmitButton = props => (
  <button className="submit-button" onClick={props.onClick}>
    {props.title}
  </button>
)

SubmitButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.function,
}

export default SubmitButton

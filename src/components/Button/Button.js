import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = props => (
  <button className="button" onClick={props.onClick}>
    {props.title}
  </button>
)

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button

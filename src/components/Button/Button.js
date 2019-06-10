import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = props => (
  <button
    className={props.active ? 'button button--active' : 'button'}
    onClick={props.onClick}
    type="button"
  >
    {props.title}
  </button>
)

Button.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button

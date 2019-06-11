import React from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

const Input = props => (
  <li className="input-wrapper">
    <label htmlFor={`input-${props.title}`}>
      <input
        type="radio"
        value={props.value}
        checked={props.checked}
        id={`input-${props.title}`}
      />
      <span
        className={
          props.checked ? 'input-title input-title--active' : 'input-title'
        }
      >
        {props.title}
      </span>
    </label>
  </li>
)

Input.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
}

export default Input

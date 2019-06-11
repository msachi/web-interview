import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input/Input'

import './SelectSection.scss'
import icon from '../../images/icon.png'

const SelectSection = props => (
  <fieldset className="select-section">
    <legend className="header">
      <img className="icon" src={icon} alt="Section icon" />
      <h4 className="title">{props.title}</h4>
    </legend>
    <ul
      className="options-wrapper"
      onChange={e => props.onChange(e.target.value)}
    >
      {props.options.map(b => (
        <Input
          key={b.title}
          value={b.value}
          title={b.title}
          checked={props.selected === b.value}
        />
      ))}
    </ul>
  </fieldset>
)

SelectSection.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.string,
  onChange: PropTypes.func,
}

export default SelectSection

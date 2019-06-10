import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'

import './SelectSection.scss'
import icon from '../../images/icon.png'

const SelectSection = props => (
  <div className="select-section">
    <div className="header">
      <img className="icon" src={icon} alt="Section icon" />
      <h4 className="title">{props.title}</h4>
    </div>
    <div className="button-wrapper">
      {props.buttons.map(b => (
        <Button
          key={b.title}
          onClick={b.onClick}
          title={b.title}
          active={b.active}
        />
      ))}
    </div>
  </div>
)

SelectSection.propTypes = {
  title: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.object),
}

export default SelectSection

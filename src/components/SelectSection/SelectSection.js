import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'

import './SelectSection.scss'

const SelectSection = props => (
  <div className="section">
    <h3 className="section-title">{props.title}</h3>
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
  buttons: PropTypes.arrayOf(PropTypes.Object),
}

export default SelectSection

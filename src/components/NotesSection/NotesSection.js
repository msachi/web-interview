import React from 'react'
import PropTypes from 'prop-types'

import './NotesSection.scss'
import icon from '../../images/icon.png'

const NotesSection = props => (
  <fieldset className="notes-section">
    <label className="header" htmlFor="notes">
      <img className="icon" src={icon} alt="Section icon" />
      <h4 className="title">{props.title}</h4>
    </label>
    <textarea
      name="notes"
      id="notes"
      className="textbox"
      placeholder={props.placeholder}
      value={props.text}
      onChange={e => props.onChange(e.target.value)}
    />
  </fieldset>
)

NotesSection.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default NotesSection

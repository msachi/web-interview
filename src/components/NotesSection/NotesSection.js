import React from 'react'
import PropTypes from 'prop-types'

import './NotesSection.scss'
import icon from '../../images/icon.png'

const NotesSection = props => (
  <div className="notes-section">
    <div className="header">
      <img className="icon" src={icon} />
      <h4 className="title">{props.title}</h4>
    </div>
    <textarea
      className="textbox"
      placeholder={props.placeholder}
      value={props.text}
      onChange={e => props.onTextChange(e.target.value)}
    />
  </div>
)

NotesSection.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  onTextChange: PropTypes.function,
}

export default NotesSection

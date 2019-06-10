import React from 'react'
import PropTypes from 'prop-types'

import './NotesSection.scss'

const NotesSection = props => (
  <div className="section">
    <h3 className="section-title">{props.title}</h3>
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

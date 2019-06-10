import React from 'react'
import PropTypes from 'prop-types'

import './UserInfo.scss'

const UserInfo = props => {
  const name = `${props.userInfo.firstName} ${props.userInfo.lastName}`

  return (
    <div className="component-wrapper">
      <div className="avatar-wrapper">
        <img className="avatar" src={props.userInfo.avatar} alt="User avatar" />
        <p className="username">{name}</p>
      </div>
      <p className="change-link">Change</p>
    </div>
  )
}

UserInfo.propTypes = {
  userInfo: PropTypes.object,
}

export default UserInfo

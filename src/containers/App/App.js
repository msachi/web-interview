import React, { Component } from 'react'

import BookingForm from '../BookingForm/BookingForm'

import { getUserInitials } from './helpers'
import './App.scss'
import burger from '../../images/burger.png'
import logo from '../../images/logo.png'

import { API_ENDPOINT } from '../../config'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      userInfo: null,
      loadingUser: true,
      error: false,
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/users/${this.state.userId}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error()
        }
        return res.json()
      })
      .then(json => {
        this.setState({
          userInfo: json,
          loadingUser: false,
        })
      })
      .catch(() =>
        this.setState({
          error: true,
          loadingUser: false,
        })
      )
  }

  render() {
    if (this.state.loadingUser) return null

    return (
      <div className="app">
        <div className="app-header">
          <img src={burger} className="header-image" alt="Menu" />
          <img src={logo} className="header-image" alt="Babylon Health" />
          <div className="user-initials">
            {getUserInitials(this.state.userInfo, this.state.error)}
          </div>
        </div>
        {this.state.error ? (
          <h4 className="user-error">
            Sorry, there was an error retrieving user data! Please call our team
            to make an appointment.
          </h4>
        ) : (
          <BookingForm
            userId={this.state.userId}
            userInfo={this.state.userInfo}
          />
        )}
      </div>
    )
  }
}

export default App

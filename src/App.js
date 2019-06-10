import React, { Component, Fragment } from 'react'
import moment from 'moment'

import burger from './images/burger.png'
import logo from './images/logo.png'

import { API_ENDPOINT } from './config'

import UserInfo from './components/UserInfo/UserInfo'
import SelectSection from './components/SelectSection/SelectSection'
import NotesSection from './components/NotesSection/NotesSection'
import SubmitButton from './components/Button/SubmitButton'

import './App.scss'

moment.locale('en', {
  calendar: {
    sameDay: '[Today at] kk:mm',
    nextDay: '[Tomorrow at] kk:mm',
    nextWeek: 'dddd [at] kk:mm',
    sameElse: 'Do MMM [at] kk:mm',
  },
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      availableSlots: [],
      selectedConsultantType: 'gp',
      selectedAppointmentType: 'video',
      selectedAppointmentTime: '',
      noteText: null,
      loadingSlots: true,
      loadingUser: true,
      error: false,
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error()
        }
        return res.json()
      })
      .then(json => {
        this.setState({
          availableSlots: json,
          selectedAppointmentTime: json.map(slot => slot.time)[0],
          loadingSlots: false,
        })
      })
      .catch(() => this.setState({ error: true, loadingSlots: false }))

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
      .catch(() => this.setState({ error: true, loadingUser: false }))
  }

  getUserInitials() {
    const { firstName, lastName } = this.state.userInfo
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  }

  formatTitle(title) {
    if (title === 'gp') return 'GP'
    return title.charAt(0).toUpperCase() + title.slice(1)
  }

  getConsultantTypes() {
    const consultants = this.state.availableSlots.reduce(
      (acc, curr) => acc.concat(curr.consultantType),
      []
    )
    return [...new Set(consultants)]
  }

  getAppointmentTimes() {
    return this.state.availableSlots
      .filter(slot =>
        slot.consultantType.includes(this.state.selectedConsultantType)
      )
      .map(slot => slot.time)
  }

  getAppointmentTypes() {
    if (!this.state.selectedSlot) return ['video', 'audio']
    return this.state.availableSlots
      .find(slot => slot.time === this.state.selectedSlot)
      .appointmentType.sort((a, b) => b.localeCompare - a.localeCompare)
  }

  onSubmitAppointment(e) {
    e.preventDefault()
    return fetch(`${API_ENDPOINT}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userId,
        dateTime: this.state.selectedAppointmentTime,
        notes: this.state.noteText,
        consultantType: this.state.selectedConsultantType,
        appointmentType: this.state.selectedAppointmentType,
      }),
    })
  }

  render() {
    if (this.state.loadingSlots || this.state.loadingUser) return null

    return (
      <div className="app">
        <div className="app-header">
          <img src={burger} className="burger-menu" alt="Menu" />
          <img src={logo} className="app-logo" alt="Babylon Health" />
          {!this.state.error && (
            <div className="user-initials">{this.getUserInitials()}</div>
          )}
        </div>
        <div className="appointment-section">
          <h2 className="h6">New appointment</h2>
          {this.state.error ? (
            <p>
              Sorry, there was an error requesting server data. Please call our
              helpline.
            </p>
          ) : (
            <Fragment>
              <UserInfo userInfo={this.state.userInfo} />
              <form onSubmit={e => this.onSubmitAppointment(e)}>
                <SelectSection
                  title="Consultant Type"
                  buttons={this.getConsultantTypes().map(type => ({
                    title: this.formatTitle(type),
                    onClick: () =>
                      this.setState({ selectedConsultantType: type }),
                    active: this.state.selectedConsultantType === type,
                  }))}
                />
                <SelectSection
                  title="Date & Time"
                  buttons={this.getAppointmentTimes().map((time, i) => ({
                    title: moment(time).calendar(),
                    onClick: () =>
                      this.setState({ selectedAppointmentTime: time }),
                    active: this.state.selectedAppointmentTime === time,
                  }))}
                />
                <SelectSection
                  title="Appointment Type"
                  buttons={this.getAppointmentTypes().map(type => ({
                    title: this.formatTitle(type),
                    onClick: () =>
                      this.setState({ selectedAppointmentType: type }),
                    active: this.state.selectedAppointmentType === type,
                  }))}
                />
                <NotesSection
                  title="Notes"
                  placeholder="Describe your symptoms"
                  text={this.state.noteText}
                  onTextChange={noteText => this.setState({ noteText })}
                />
                <div className="section-border" />
                <SubmitButton title="Book appointment" />
              </form>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default App

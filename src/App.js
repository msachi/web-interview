import React, { Component } from 'react'
import moment from 'moment'

import logo from './logo.png'
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
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          availableSlots: json,
          selectedAppointmentTime: json.map(slot => slot.time)[0],
        })
      })
      .catch(() => {
        ''
        // TODO: Handle error here
      })

    fetch(`${API_ENDPOINT}/users/${this.state.userId}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ userInfo: json })
      })
      .catch(() => {
        ''
        // TODO: Handle error here
      })
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

  onSubmitAppointment() {
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
    }).then(response => response.json()) // parses JSON response into native Javascript objects
  }

  render() {
    if (!this.state.availableSlots.length || !this.state.userInfo) return null
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          <h2 className="h6">New appointment</h2>
          <UserInfo userInfo={this.state.userInfo} />
          <form onSubmit={() => this.onSubmitAppointment()}>
            <SelectSection
              title="Consultant Type"
              buttons={this.getConsultantTypes().map(type => ({
                title: this.formatTitle(type),
                onClick: () => this.setState({ selectedConsultantType: type }),
                active: this.state.selectedConsultantType === type,
              }))}
            />
            <SelectSection
              title="Date & Time"
              buttons={this.getAppointmentTimes().map((time, i) => ({
                title: moment(time).calendar(),
                onClick: () => this.setState({ selectedAppointmentTime: time }),
                active: this.state.selectedAppointmentTime === time,
              }))}
            />
            <SelectSection
              title="Appointment Type"
              buttons={this.getAppointmentTypes().map(type => ({
                title: this.formatTitle(type),
                onClick: () => this.setState({ selectedAppointmentType: type }),
                active: this.state.selectedAppointmentType === type,
              }))}
            />
            <NotesSection
              title="Notes"
              placeholder="Describe your symptoms"
              text={this.state.noteText}
              onTextChange={noteText => this.setState({ noteText })}
            />
            <SubmitButton title="Book appointment" />
          </form>
        </div>
      </div>
    )
  }
}

export default App

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import UserInfo from '../../components/UserInfo/UserInfo'
import SelectSection from '../../components/SelectSection/SelectSection'
import NotesSection from '../../components/NotesSection/NotesSection'
import Button from '../../components/Button/Button'
import {
  formatTitle,
  getConsultantTypes,
  getAppointmentTimes,
  getAppointmentTypes,
} from './helpers'

import './BookingForm.scss'
import { API_ENDPOINT } from '../../config'

moment.updateLocale('en', {
  calendar: {
    sameDay: '[Today at] kk:mm',
    nextDay: '[Tomorrow at] kk:mm',
    nextWeek: 'dddd [at] kk:mm',
    sameElse: 'Do MMM [at] kk:mm',
  },
})

class BookingForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: props.userId,
      userInfo: props.userInfo,
      availableSlots: [],
      selectedConsultantType: 'gp',
      selectedAppointmentType: 'video',
      selectedAppointmentTime: '',
      noteText: '',
      loadingSlots: true,
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
      .catch(() =>
        this.setState({
          error: true,
          loadingSlots: false,
        })
      )
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
        notes: this.state.noteText || null,
        consultantType: this.state.selectedConsultantType,
        appointmentType: this.state.selectedAppointmentType,
      }),
    })
  }

  renderForm() {
    return (
      <Fragment>
        <UserInfo userInfo={this.state.userInfo} />
        <form onSubmit={e => this.onSubmitAppointment(e)}>
          <SelectSection
            title="Consultant Type"
            options={getConsultantTypes(this.state.availableSlots).map(
              type => ({
                value: type,
                title: formatTitle(type),
              })
            )}
            selected={this.state.selectedConsultantType}
            onChange={t =>
              this.setState({
                selectedConsultantType: t,
                selectedAppointmentTime: getAppointmentTimes(
                  this.state.availableSlots,
                  t
                )[0],
              })
            }
          />
          <SelectSection
            title="Date & Time"
            options={getAppointmentTimes(
              this.state.availableSlots,
              this.state.selectedConsultantType
            ).map((time, i) => ({
              value: time,
              title: moment(time).calendar(),
            }))}
            selected={this.state.selectedAppointmentTime}
            onChange={t => this.setState({ selectedAppointmentTime: t })}
          />
          <SelectSection
            title="Appointment Type"
            options={getAppointmentTypes(
              this.state.availableSlots,
              this.state.selectedAppointmentTime
            ).map(type => ({
              value: type,
              title: formatTitle(type),
            }))}
            selected={this.state.selectedAppointmentType}
            onChange={t => this.setState({ selectedAppointmentType: t })}
          />
          <NotesSection
            title="Notes"
            placeholder="Describe your symptoms"
            text={this.state.noteText}
            onChange={noteText => this.setState({ noteText })}
          />
          <div className="section-border" />
          <Button title="Book" />
        </form>
      </Fragment>
    )
  }

  render() {
    if (this.state.loadingSlots) return null

    return (
      <div className="booking-form">
        <h2 className="main-title">New Appointment</h2>
        {this.state.error ? (
          <h4>
            Sorry, there was an error retrieving appointments! Please call our
            team to make an appointment.
          </h4>
        ) : (
          this.renderForm()
        )}
      </div>
    )
  }
}

BookingForm.propTypes = {
  userId: PropTypes.number,
  userInfo: PropTypes.object,
}

export default BookingForm

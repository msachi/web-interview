import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react'

import data from '../../../data/data.json'
import { API_ENDPOINT } from '../../config'

import BookingForm from './BookingForm'
import {
  formatTitle,
  getConsultantTypes,
  getAppointmentTimes,
  getAppointmentTypes,
} from './helpers'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const mockData = {
  [API_ENDPOINT + '/availableSlots']: data.availableSlots,
  [API_ENDPOINT + '/appointments']: data.appointments,
}

global.fetch = jest.fn().mockImplementation(url => {
  return Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockData[url]),
  })
})

test('formatTitle works as expected', () => {
  expect(formatTitle('specialist')).toBe('Specialist')
  expect(formatTitle('gp')).toBe('GP')
})

test('getConsultantTypes works as expected', () => {
  expect(getConsultantTypes(data.availableSlots)).toEqual([
    'gp',
    'specialist',
    'therapist',
  ])
})

test('getAppointmentTimes works as expected', () => {
  expect(getAppointmentTimes(data.availableSlots, 'therapist')).toEqual([
    '2019-11-16T16:18:30.000Z',
  ])
})

test('getAppointmentTypes works as expected', () => {
  expect(
    getAppointmentTypes(data.availableSlots, '2019-11-16T16:18:30.000Z')
  ).toEqual(['video', 'audio'])
})

test('Renders correct options and submits correct appointment data', async () => {
  const userInfo = data.users[0]
  const { getByText, getByPlaceholderText } = render(
    <BookingForm userInfo={userInfo} />
  )

  const specialistButton = await waitForElement(() => getByText('Specialist'))

  const timeButton = getByText('1st Dec at 14:16')
  const audioButton = getByText('Audio')
  const notesBox = getByPlaceholderText('Describe your symptoms')
  const submitButton = getByText('Book appointment')

  fireEvent.click(specialistButton)
  fireEvent.click(timeButton)
  fireEvent.click(audioButton)
  fireEvent.change(notesBox, { target: { value: 'I have a terrible fever' } })
  fireEvent.click(submitButton)

  expect(global.fetch).toHaveBeenLastCalledWith(
    'http://localhost:3010/appointments',
    {
      body:
        '{"dateTime":"2019-12-01T14:16:30.000Z","notes":"I have a terrible fever","consultantType":"specialist","appointmentType":"audio"}',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }
  )
  expect(global.fetch).toHaveBeenCalledTimes(2)
})

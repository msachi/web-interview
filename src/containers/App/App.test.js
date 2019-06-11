import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'

import App from './App'
import { getUserInitials } from './helpers'

import data from '../../../data/data.json'
import { API_ENDPOINT } from '../../config'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const mockData = {
  [API_ENDPOINT + '/users/1']: data.users[0],
  [API_ENDPOINT + '/availableSlots']: data.availableSlots,
}

global.fetch = jest.fn().mockImplementation(url => {
  return Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockData[url]),
  })
})

test('getUserInitials works as expected', () => {
  expect(getUserInitials({ firstName: 'Jane', lastName: 'Doe' }, null)).toBe(
    'JD'
  )
  expect(getUserInitials({}, 'error')).toBe('??')
})

test('Fetches and renders user info correctly', async () => {
  const { getByText } = render(<App />)

  await waitForElement(() => getByText('JD'))
  await waitForElement(() => getByText('Jane Doe'))

  expect(global.fetch).toHaveBeenCalledTimes(2)
})

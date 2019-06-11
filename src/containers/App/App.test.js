import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'

import data from '../../../data/data.json'
import { API_ENDPOINT } from '../../config'

import App from './App'

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

test('Fetches and renders user info correctly', async () => {
  const { getByText } = render(<App />)

  await waitForElement(() => getByText('JD'))
  await waitForElement(() => getByText('Jane Doe'))

  expect(global.fetch).toHaveBeenCalledTimes(2)
})

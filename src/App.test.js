import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  wait,
} from '@testing-library/react'
import App from './App'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('Renders correct options and submits correct appointment data', () => {
  const { getByText, getByPlaceholderText } = render(<App />)

  waitForElement(() => getByText('Specialist')).then(() => {
    const specialistButton = getByText('Specialist')
    const timeButton = getByText('1st Dec at 14:16')
    const audioButton = getByText('Audio')
    const notesBox = getByPlaceholderText('Describe your symptoms')
    const submitButton = getByText('Book appointment')

    fireEvent.click(specialistButton)
    fireEvent.click(timeButton)
    fireEvent.click(audioButton)
    fireEvent.change(notesBox, { target: { value: 'I have a terrible fever' } })
    fireEvent.click(submitButton)
  })
})

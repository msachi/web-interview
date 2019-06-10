import React from 'react'
import { render, cleanup } from '@testing-library/react'
import NotesSection from './NotesSection'

afterEach(cleanup)

test('Renders NotesSection correctly', () => {
  const container = render(
    <NotesSection
      title="Notes"
      text="Current text"
      placeholder="Type in here"
      onTextChange={() => console.log('Hello')}
    />
  )
  expect(container).toMatchSnapshot()
})

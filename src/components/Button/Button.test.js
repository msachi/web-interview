import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Button from './Button'
import SubmitButton from './SubmitButton'

afterEach(cleanup)

test('Renders normal Button correctly', () => {
  const container = render(
    <Button
      title="Click me"
      active={true}
      onClick={() => console.log('Hello')}
    />
  )
  expect(container).toMatchSnapshot()
})

test('Renders submit button correctly', () => {
  const container = render(
    <SubmitButton title="Click me" onClick={() => console.log('Hello')} />
  )
  expect(container).toMatchSnapshot()
})

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Button from './Button'

afterEach(cleanup)

test('Renders Button correctly', () => {
  const container = render(<Button title="Click me" onClick={() => {}} />)
  expect(container).toMatchSnapshot()
})

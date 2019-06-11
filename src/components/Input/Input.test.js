import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Input from './Input'

afterEach(cleanup)

test('Renders Input correctly', () => {
  const container = render(
    <Input title="Click me" active={true} onClick={() => {}} />
  )
  expect(container).toMatchSnapshot()
})

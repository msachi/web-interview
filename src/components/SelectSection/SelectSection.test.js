import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SelectSection from './SelectSection'

afterEach(cleanup)

test('Renders SelectSection correctly', () => {
  const container = render(
    <SelectSection
      title="Consultant Type"
      options={[
        {
          title: 'GP',
          onChange: () => {},
          active: true,
        },
        {
          title: 'Specialist',
          onChange: () => {},
          active: false,
        },
        {
          title: 'Therapist',
          onChange: () => {},
          active: false,
        },
      ]}
    />
  )
  expect(container).toMatchSnapshot()
})

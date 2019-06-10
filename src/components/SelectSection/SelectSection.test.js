import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SelectSection from './SelectSection'

afterEach(cleanup)

test('Renders SelectSection correctly', () => {
  const container = render(
    <SelectSection
      title="Consultant Type"
      buttons={[
        {
          title: 'GP',
          onClick: () => {},
          active: true,
        },
        {
          title: 'Specialist',
          onClick: () => {},
          active: false,
        },
        {
          title: 'Therapist',
          onClick: () => {},
          active: false,
        },
      ]}
    />
  )
  expect(container).toMatchSnapshot()
})

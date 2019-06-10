import React from 'react'
import { render, cleanup } from '@testing-library/react'
import data from '../../../data/data.json'

import UserInfo from './UserInfo'

afterEach(cleanup)

test('Renders UserInfo correctly', () => {
  const container = render(<UserInfo userInfo={data.users[0]} />)
  expect(container).toMatchSnapshot()
})

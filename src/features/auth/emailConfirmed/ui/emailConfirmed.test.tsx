import React from 'react'

import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { EmailConfirmed } from './EmailConfirmed'

import { render } from '__mocks__/customRender'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { code: 'mockCode' },
    locale: 'en',
  }),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

const useEmailConfirmedMutation = jest
  .fn(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email is already confirmed' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email is already confirmed' }],
        resultCode: 0,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email is already confirmed' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'Code is incorrect' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email confirmation code is expired' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])

jest.mock('@/features/auth/emailConfirmed/service/emailConfirmed', () => ({
  useEmailConfirmedMutation: () => useEmailConfirmedMutation(),
}))
describe('EmailConfirmed', () => {
  it('renders the EmailConfirmed', async () => {
    const { user, debug } = setup(<EmailConfirmed />)

    await waitFor(() => {
      expect(screen.queryByText(/Your email has been confirmed/i)).toBeInTheDocument()
    })
  })
  it('renders the alreadyConfirmedEmail', async () => {
    const { user, debug } = setup(<EmailConfirmed />)

    expect(screen.queryByText(/Your email is already confirmed/i)).toBeInTheDocument()
  })
  it('renders the Code is incorrect', async () => {
    const { user, debug } = setup(<EmailConfirmed />)

    expect(screen.queryByText(/Code is incorrect/i)).toBeInTheDocument()
  })
  it('renders the email confirmation code is expired', async () => {
    const { user, debug } = setup(<EmailConfirmed />)

    expect(
      screen.queryByText(
        /Looks like the verification link has expired. Not to worry, we can send the link again/i
      )
    ).toBeInTheDocument()
  })

  it('snapshot EmailConfirmed', () => {
    const snapshot = render(<EmailConfirmed />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})

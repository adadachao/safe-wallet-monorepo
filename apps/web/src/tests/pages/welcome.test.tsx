import { render, waitFor } from '@testing-library/react'
import WelcomePage from '../../pages/welcome/index'
import { AppRoutes } from '@/config/routes'
import * as router from 'next/router'

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const setup = (query: Record<string, string> = {}) => {
  ;(router.useRouter as jest.Mock).mockReturnValue({
    isReady: true,
    pathname: AppRoutes.welcome.index,
    query,
    replace: mockReplace,
  })
}

describe('WelcomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to /welcome/accounts (MOVA)', async () => {
    setup()

    render(<WelcomePage />)

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith({ pathname: AppRoutes.welcome.accounts, query: {} }))
  })

  it('preserves query params when redirecting', async () => {
    setup({ next: '/balances?safe=eth%3A0xabc', safe: 'eth:0xabc', chain: 'eth' })

    render(<WelcomePage />)

    await waitFor(() =>
      expect(mockReplace).toHaveBeenCalledWith({
        pathname: AppRoutes.welcome.accounts,
        query: { next: '/balances?safe=eth%3A0xabc', safe: 'eth:0xabc', chain: 'eth' },
      }),
    )
  })
})

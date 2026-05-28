import { render, waitFor } from '@testing-library/react'
import IndexPage from '../../pages/index'
import { AppRoutes } from '@/config/routes'
import * as router from 'next/router'

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const setup = ({
  isReady = true,
  pathname = AppRoutes.index,
  query = {} as Record<string, string>,
}: {
  isReady?: boolean
  pathname?: string
  query?: Record<string, string>
}) => {
  ;(router.useRouter as jest.Mock).mockReturnValue({ isReady, pathname, query, replace: mockReplace })
}

describe('IndexPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to /welcome/accounts (MOVA)', async () => {
    setup({})

    render(<IndexPage />)

    await waitFor(() =>
      expect(mockReplace).toHaveBeenCalledWith({ pathname: AppRoutes.welcome.accounts, query: undefined }),
    )
  })

  it('forwards ?chain= when redirecting to /welcome/accounts', async () => {
    setup({ query: { chain: 'eth' } })

    render(<IndexPage />)

    await waitFor(() =>
      expect(mockReplace).toHaveBeenCalledWith({ pathname: AppRoutes.welcome.accounts, query: { chain: 'eth' } }),
    )
  })

  it('does not redirect before the router is ready', () => {
    setup({ isReady: false })

    render(<IndexPage />)

    expect(mockReplace).not.toHaveBeenCalled()
  })
})

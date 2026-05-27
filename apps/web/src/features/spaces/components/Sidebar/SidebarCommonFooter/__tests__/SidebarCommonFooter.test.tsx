import { render, screen } from '@testing-library/react'
import { SidebarCommonFooter } from '../SidebarCommonFooter'

describe('SidebarCommonFooter', () => {
  it('renders nothing (MOVA: footer hidden)', () => {
    const { container } = render(<SidebarCommonFooter />)

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByTestId('sidebar-common-footer')).not.toBeInTheDocument()
    expect(screen.queryByText('Help')).not.toBeInTheDocument()
    expect(screen.queryByText('Use prod CGW')).not.toBeInTheDocument()
  })
})

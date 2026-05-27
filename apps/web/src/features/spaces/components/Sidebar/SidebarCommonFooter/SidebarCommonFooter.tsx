import { type ReactElement } from 'react'

type SidebarCommonFooterProps = {
  isSafeSidebar?: boolean
}

// MOVA: hide sidebar footer (Use prod CGW, API, Help, What's new, indexing status)
export const SidebarCommonFooter = (props: SidebarCommonFooterProps = {}): ReactElement | null => {
  void props
  return null
}

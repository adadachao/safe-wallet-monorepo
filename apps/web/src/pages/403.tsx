import { EXTERNAL_TERMS_URL } from '@/config/constants'
import type { NextPage } from 'next'
import MUILink from '@mui/material/Link'
import SafeLogo from '@/components/common/SafeLogo'

const Custom403: NextPage = () => {
  return (
    <main>
      <div className="fixed top-0 left-0 z-[1300] flex items-center px-6" style={{ height: 'var(--header-height)' }}>
        <SafeLogo />
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>403 – Access Restricted</h1>
      <p>
        We regret to inform you that access to this service is currently unavailable in your region. For further
        information, you may refer to our{' '}
        <MUILink href={EXTERNAL_TERMS_URL} target="_blank" rel="noreferrer">
          terms
        </MUILink>
        . We apologize for any inconvenience this may cause. Thank you for your understanding.
      </p>
    </main>
  )
}

export default Custom403

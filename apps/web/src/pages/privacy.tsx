import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { BRAND_NAME, EXTERNAL_PRIVACY_URL } from '@/config/constants'

const PrivacyPolicy: NextPage = () => {
  useEffect(() => {
    window.location.replace(EXTERNAL_PRIVACY_URL)
  }, [])

  return (
    <Head>
      <title>{`${BRAND_NAME} – Privacy policy`}</title>
    </Head>
  )
}

export default PrivacyPolicy

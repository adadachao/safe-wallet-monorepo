import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { BRAND_NAME, EXTERNAL_TERMS_URL } from '@/config/constants'

const Terms: NextPage = () => {
  useEffect(() => {
    window.location.replace(EXTERNAL_TERMS_URL)
  }, [])

  return (
    <Head>
      <title>{`${BRAND_NAME} – Terms`}</title>
    </Head>
  )
}

export default Terms

import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/config/routes'
import { BRAND_NAME } from '@/config/constants'

const Welcome: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    router.replace({ pathname: AppRoutes.welcome.accounts, query: router.query })
  }, [router])

  return (
    <Head>
      <title>{`${BRAND_NAME} – Welcome`}</title>
    </Head>
  )
}

export default Welcome

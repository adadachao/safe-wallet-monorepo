/**
 * Build-time script to pre-fetch chain configurations from the CGW API.
 * Writes the result to src/config/__generated__/chains.json so the app can
 * use it as an instant cache seed on startup, avoiding the blocking /v2/chains
 * network request before any other API call can proceed.
 *
 * Run with: yarn fetch-chains
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config as loadEnv } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.join(__dirname, '..')

// Next.js loads these automatically; this standalone script must load them explicitly.
loadEnv({ path: path.join(appRoot, '.env') })
loadEnv({ path: path.join(appRoot, '.env.local'), override: true })

const IS_PRODUCTION = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true'
const GATEWAY_URL_PRODUCTION = process.env.NEXT_PUBLIC_GATEWAY_URL_PRODUCTION || 'https://safe-client.safe.global'
const GATEWAY_URL_STAGING = process.env.NEXT_PUBLIC_GATEWAY_URL_STAGING || 'https://safe-client.staging.5afe.dev'

const GATEWAY_URL = IS_PRODUCTION ? GATEWAY_URL_PRODUCTION : GATEWAY_URL_STAGING
const CONFIG_SERVICE_KEY = process.env.NEXT_PUBLIC_CONFIG_SERVICE_KEY || 'WALLET_WEB'

const OUTPUT_DIR = path.join(appRoot, 'src', 'config', '__generated__')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'chains.json')

type ChainPage = {
  results: unknown[]
  next?: string | null
}

const buildGatewayUrl = (pathname: string): URL => {
  const base = GATEWAY_URL.replace(/\/$/, '')
  // Leading slash would replace the `/cgw` path segment — use a relative path instead.
  const path = pathname.startsWith('/') ? pathname.slice(1) : pathname
  return new URL(`${base}/${path}`)
}

async function fetchAllChains(): Promise<unknown[]> {
  const allChains: unknown[] = []
  let url: URL | null = buildGatewayUrl('v2/chains')
  url.searchParams.set('serviceKey', CONFIG_SERVICE_KEY)
  url.searchParams.set('cursor', 'limit=50&offset=0')

  while (url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch chains: ${response.status} ${response.statusText}`)
    }

    const data: ChainPage = await response.json()
    allChains.push(...data.results)

    url = data.next ? new URL(data.next, `${GATEWAY_URL.replace(/\/$/, '')}/`) : null
  }

  return allChains
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  try {
    console.log(`Fetching chains from ${GATEWAY_URL} (IS_PRODUCTION=${IS_PRODUCTION})...`)
    const chains = await fetchAllChains()
    const overrides = JSON.parse(
      fs.readFileSync(path.join(appRoot, 'src', 'config', 'chain-contract-overrides.json'), 'utf-8'),
    ) as Record<string, Record<string, string | null>>

    const chainsWithContracts = chains.map((chain) => {
      const chainRecord = chain as { chainId?: string; contractAddresses?: Record<string, string | null> }
      const override = chainRecord.chainId ? overrides[chainRecord.chainId] : undefined

      if (!override) {
        return chain
      }

      return {
        ...chainRecord,
        contractAddresses: {
          ...override,
          ...chainRecord.contractAddresses,
        },
      }
    })

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chainsWithContracts, null, 2))
    console.log(`Wrote ${chains.length} chains to ${path.relative(process.cwd(), OUTPUT_FILE)}`)
  } catch (error) {
    console.warn('Warning: Failed to fetch chains at build time. Using empty array as fallback.')
    console.warn(error instanceof Error ? error.message : error)
    fs.writeFileSync(OUTPUT_FILE, '[]')
  }
}

main()

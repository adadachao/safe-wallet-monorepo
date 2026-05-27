import type { Chain } from '@safe-global/store/gateway/AUTO_GENERATED/chains'
import type { ChainContractAddresses } from '@safe-global/utils/services/contracts/chainContractAddresses'
import { mergeChainContractAddresses } from '@safe-global/utils/services/contracts/chainContractAddresses'
import { CHAIN_CONTRACT_ADDRESS_OVERRIDES } from '@/config/chainContractOverrides'

type ChainWithOptionalContracts = Chain & { contractAddresses?: ChainContractAddresses | null }

let staticChainsById: Record<string, ChainContractAddresses> = {}

try {
  const staticChains = require('@/config/__generated__/chains.json') as ChainWithOptionalContracts[]
  staticChainsById = Object.fromEntries(
    staticChains
      .filter((chain) => chain.contractAddresses)
      .map((chain) => [chain.chainId, chain.contractAddresses as ChainContractAddresses]),
  )
} catch {
  // chains.json may be missing in some CI jobs
}

/** CGW /v2/chains strips contractAddresses — merge from chains.json cache and local overrides. */
export const getChainContractAddressesForChain = (chain: Chain): ChainContractAddresses | undefined =>
  mergeChainContractAddresses(
    {
      chainId: chain.chainId,
      contractAddresses: (chain as ChainWithOptionalContracts).contractAddresses ?? staticChainsById[chain.chainId],
    },
    CHAIN_CONTRACT_ADDRESS_OVERRIDES,
  )

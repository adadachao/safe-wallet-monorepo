import type { ChainContractAddresses } from '@safe-global/utils/services/contracts/chainContractAddresses'
import chainContractOverrides from './chain-contract-overrides.json'

/** Mars and other chains where CGW omits `contractAddresses` on /v2/chains. */
export const CHAIN_CONTRACT_ADDRESS_OVERRIDES = chainContractOverrides as Record<string, ChainContractAddresses>

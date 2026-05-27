import type { ContractNetworkConfig, ContractNetworksConfig } from '@safe-global/protocol-kit'

export interface ChainContractAddresses {
  safeSingletonAddress?: string | null
  safeProxyFactoryAddress?: string | null
  multiSendAddress?: string | null
  multiSendCallOnlyAddress?: string | null
  fallbackHandlerAddress?: string | null
  signMessageLibAddress?: string | null
  createCallAddress?: string | null
  simulateTxAccessorAddress?: string | null
  safeWebAuthnSignerFactoryAddress?: string | null
}

export interface ChainWithContractAddresses {
  chainId: string
  contractAddresses?: ChainContractAddresses | null
}

const isNonEmptyAddress = (value: string | null | undefined): value is string =>
  typeof value === 'string' && value.length > 0

const pickAddress = (...candidates: Array<string | null | undefined>): string | undefined =>
  candidates.find(isNonEmptyAddress)

/**
 * Merges static overrides with `contractAddresses` from chain config (chains.json / CGW).
 * Values from chain config take precedence over static overrides.
 */
export const mergeChainContractAddresses = (
  chain: ChainWithContractAddresses,
  overrides?: Record<string, ChainContractAddresses>,
): ChainContractAddresses | undefined => {
  const fromOverride = overrides?.[chain.chainId]
  const fromChain = chain.contractAddresses ?? undefined

  if (!fromOverride && !fromChain) {
    return undefined
  }

  return {
    safeSingletonAddress: pickAddress(fromChain?.safeSingletonAddress, fromOverride?.safeSingletonAddress),
    safeProxyFactoryAddress: pickAddress(fromChain?.safeProxyFactoryAddress, fromOverride?.safeProxyFactoryAddress),
    multiSendAddress: pickAddress(fromChain?.multiSendAddress, fromOverride?.multiSendAddress),
    multiSendCallOnlyAddress: pickAddress(fromChain?.multiSendCallOnlyAddress, fromOverride?.multiSendCallOnlyAddress),
    fallbackHandlerAddress: pickAddress(fromChain?.fallbackHandlerAddress, fromOverride?.fallbackHandlerAddress),
    signMessageLibAddress: pickAddress(fromChain?.signMessageLibAddress, fromOverride?.signMessageLibAddress),
    createCallAddress: pickAddress(fromChain?.createCallAddress, fromOverride?.createCallAddress),
    simulateTxAccessorAddress: pickAddress(
      fromChain?.simulateTxAccessorAddress,
      fromOverride?.simulateTxAccessorAddress,
    ),
    safeWebAuthnSignerFactoryAddress: pickAddress(
      fromChain?.safeWebAuthnSignerFactoryAddress,
      fromOverride?.safeWebAuthnSignerFactoryAddress,
    ),
  }
}

export const hasSafeCreationContractAddresses = (
  addresses: ChainContractAddresses | undefined,
): addresses is ChainContractAddresses & {
  safeSingletonAddress: string
  safeProxyFactoryAddress: string
  fallbackHandlerAddress: string
} =>
  isNonEmptyAddress(addresses?.safeSingletonAddress) &&
  isNonEmptyAddress(addresses?.safeProxyFactoryAddress) &&
  isNonEmptyAddress(addresses?.fallbackHandlerAddress)

export const toContractNetworkConfig = (addresses: ChainContractAddresses): ContractNetworkConfig | undefined => {
  if (!hasSafeCreationContractAddresses(addresses)) {
    return undefined
  }

  const config: ContractNetworkConfig = {
    safeSingletonAddress: addresses.safeSingletonAddress,
    safeProxyFactoryAddress: addresses.safeProxyFactoryAddress,
    fallbackHandlerAddress: addresses.fallbackHandlerAddress,
  }

  if (isNonEmptyAddress(addresses.multiSendAddress)) {
    config.multiSendAddress = addresses.multiSendAddress
  }
  if (isNonEmptyAddress(addresses.multiSendCallOnlyAddress)) {
    config.multiSendCallOnlyAddress = addresses.multiSendCallOnlyAddress
  }
  if (isNonEmptyAddress(addresses.signMessageLibAddress)) {
    config.signMessageLibAddress = addresses.signMessageLibAddress
  }
  if (isNonEmptyAddress(addresses.createCallAddress)) {
    config.createCallAddress = addresses.createCallAddress
  }
  if (isNonEmptyAddress(addresses.simulateTxAccessorAddress)) {
    config.simulateTxAccessorAddress = addresses.simulateTxAccessorAddress
  }

  return config
}

export const getContractNetworksFromChain = (
  chain: ChainWithContractAddresses,
  overrides?: Record<string, ChainContractAddresses>,
): ContractNetworksConfig | undefined => {
  const addresses = mergeChainContractAddresses(chain, overrides)
  const networkConfig = addresses ? toContractNetworkConfig(addresses) : undefined

  if (!networkConfig) {
    return undefined
  }

  return { [chain.chainId]: networkConfig }
}

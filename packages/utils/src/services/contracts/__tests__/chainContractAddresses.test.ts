import {
  getContractNetworksFromChain,
  hasSafeCreationContractAddresses,
  mergeChainContractAddresses,
} from '../chainContractAddresses'

const MARS_OVERRIDES = {
  '10323': {
    safeSingletonAddress: '0x11bc461e1C612A09fb5a4F59aa05740aF1146c13',
    safeProxyFactoryAddress: '0x432d79e9F83763cb09902a287332d2A91A5892eE',
    fallbackHandlerAddress: '0xEdd7Bb202D174B0ec77e55Dc7e783b68465Bb00b',
  },
}

describe('chainContractAddresses', () => {
  it('merges overrides with chain config, preferring chain config', () => {
    const merged = mergeChainContractAddresses(
      {
        chainId: '10323',
        contractAddresses: {
          safeProxyFactoryAddress: '0x0000000000000000000000000000000000000001',
        },
      },
      MARS_OVERRIDES,
    )

    expect(merged?.safeProxyFactoryAddress).toBe('0x0000000000000000000000000000000000000001')
    expect(merged?.safeSingletonAddress).toBe(MARS_OVERRIDES['10323'].safeSingletonAddress)
  })

  it('builds contractNetworks for Mars from overrides', () => {
    const networks = getContractNetworksFromChain({ chainId: '10323' }, MARS_OVERRIDES)

    expect(networks?.['10323']?.safeProxyFactoryAddress).toBe(MARS_OVERRIDES['10323'].safeProxyFactoryAddress)
    expect(hasSafeCreationContractAddresses(MARS_OVERRIDES['10323'])).toBe(true)
  })
})

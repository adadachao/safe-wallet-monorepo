import dynamic from 'next/dynamic'

/**
 * Monitors on-chain Safe deployment after create (PROCESSING → SUCCESS).
 * Must run on all chains — including those without FEATURES.COUNTERFACTUAL.
 * Direct deploy still dispatches PROCESSING; without this hook the status step hangs.
 */
const LazyCounterfactual = dynamic(() => import('@/features/counterfactual/components/LazyCounterfactual'), {
  ssr: false,
})

const SafeCreationMonitorLoader = () => <LazyCounterfactual />

export default SafeCreationMonitorLoader

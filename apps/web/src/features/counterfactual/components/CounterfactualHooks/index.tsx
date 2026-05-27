import CounterfactualSuccessScreen from '../CounterfactualSuccessScreen'

/**
 * Global hooks component for counterfactual feature.
 *
 * Safe creation monitoring (LazyCounterfactual) is mounted unconditionally via
 * SafeCreationMonitorLoader in _app.tsx so direct deploy works on chains
 * without FEATURES.COUNTERFACTUAL (e.g. custom Mars).
 */
function CounterfactualHooks() {
  return <CounterfactualSuccessScreen />
}

export default CounterfactualHooks

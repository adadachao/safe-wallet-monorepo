import { type ChangeEvent, type ReactElement } from 'react'
import { Box, FormControlLabel, Switch } from '@mui/material'
import useLocalStorage from '@/services/local-storage/useLocalStorage'
import { LS_KEY } from '@/config/gateway'

const DebugToggle = (): ReactElement => {
  const [isProdGateway = false, setIsProdGateway] = useLocalStorage<boolean>(LS_KEY)

  const onToggleGateway = (event: ChangeEvent<HTMLInputElement>) => {
    setIsProdGateway(event.target.checked)

    setTimeout(() => {
      location.reload()
    }, 300)
  }

  return (
    <Box py={2} ml={2}>
      {/* Theme toggle — uncomment to allow switching light/dark mode in the debug sidebar
      <FormControlLabel
        control={<Switch checked={isDarkMode} onChange={(_, checked) => dispatch(setDarkMode(checked))} />}
        label="Dark mode"
      />
      */}
      <FormControlLabel control={<Switch checked={isProdGateway} onChange={onToggleGateway} />} label="Use prod CGW" />
    </Box>
  )
}

export default DebugToggle

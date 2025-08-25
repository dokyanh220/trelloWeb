import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <FormControl>
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="demo-simple-select"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{ height: '32px' }}
      >
        <MenuItem value="light">
          <LightModeIcon fontSize="28px" /> Light
        </MenuItem>
        <MenuItem value="dark">
          <DarkModeIcon fontSize="28px" /> Dark
        </MenuItem>
        <MenuItem value="system">
          <SettingsSystemDaydreamIcon fontSize="28px" /> System
        </MenuItem>
      </Select>
    </FormControl>
  )
}
export default ModeSelect

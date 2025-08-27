import Box from '@mui/material/Box'
import Column from './Column/Column'

function ListColumns() {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        display: 'flex',
        alignItems: 'start',
        overflowX: 'auto',
        overflowY: 'hidden',
        width: '100%',
        height: '100%',
        '&::-webkit-scrollbar-track': { m: 0 }
      }}
    >
      <Column />
    </Box>
  )
}

export default ListColumns

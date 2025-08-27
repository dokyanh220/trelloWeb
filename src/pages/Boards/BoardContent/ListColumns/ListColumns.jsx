import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

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
      <Box
        sx={{
          width: 'fit-content',
          height: 'fit-content',
          mx: 2,
          borderRadius: '6px',
          bgcolor: '#ffffff3d'
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: 'white',
            width: '100%',
            alignItems: 'center',
            pl: 2.5,
            py: 1
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns

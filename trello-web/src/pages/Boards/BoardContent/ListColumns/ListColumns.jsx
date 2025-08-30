import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  return (
    <SortableContext
      items={columns?.map((item) => item._id)}
      strategy={horizontalListSortingStrategy}
    >
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
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
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
    </SortableContext>
  )
}

export default ListColumns

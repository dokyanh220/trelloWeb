import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#19764d2',
        width: '100%',
        height: (theme) =>
          `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
        p: '10px 0'
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent

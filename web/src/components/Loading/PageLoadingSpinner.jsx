import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PageLoadingSpinner = ({ caption }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      width: '100vw',
      height: '100vh'
    }}>
      <CircularProgress />
      <Typography variant='h6'>{caption ? caption : 'Loading...' }</Typography>
    </Box>
  )
}

export default PageLoadingSpinner
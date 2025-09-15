import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: 'slate.50'
      }}
    >
      <Box
        component="img"
        src="404.svg"
        alt="NOT FOUND"
        sx={{
          maxWidth: '100%',
          marginBottom: 6,
          width: 384
        }}
      />
      <Typography
        variant="h5"
        component="p"
        sx={{
          fontWeight: 'fontWeightSemibold',
          textTransform: 'uppercase'
        }}
      >
        Not found
      </Typography>
      <Link
        href="/"
        sx={{
          px: 6,
          py: 3,
          mt: 6,
          fontWeight: 'fontWeightMedium',
          color: 'white',
          transition: 'all 0.2s ease-in-out',
          boxShadow: 3,
          backgroundColor: 'primary.main',
          borderRadius: 4,
          '&:hover': {
            opacity: 0.4
          },
          width: '180px',
          height: '60px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none'
        }}
      >
        Back home
      </Link>
    </Box>
  )
}

export default NotFound
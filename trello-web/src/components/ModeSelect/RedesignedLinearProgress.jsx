import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function RedesignedLinearProgress(props) {
  return (
    // Container chính để đặt nền và căn giữa nội dung
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: '#34495e',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      {/* Container cho nội dung loading để kiểm soát chiều rộng */}
      <Box sx={{ width: { xs: '90%', sm: '70%', md: '50%' } }}>
        {/* Văn bản "Loading..." */}
        <Typography
          variant="h6"
          component="div"
          sx={{ color: 'white', textAlign: 'center', mb: 2 }}
        >
          Loading...
        </Typography>

        {/* Box chứa thanh tiến trình và tỷ lệ phần trăm */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              {...props}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // Màu nền của thanh progress
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: '#1976d2' // Màu của thanh progress đang chạy
                }
              }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {`${Math.round(props.value)}%`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

RedesignedLinearProgress.propTypes = {
  value: PropTypes.number.isRequired
}

export default RedesignedLinearProgress
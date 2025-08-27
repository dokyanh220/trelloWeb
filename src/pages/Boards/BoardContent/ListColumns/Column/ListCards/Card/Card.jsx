import Typography from '@mui/material/Typography'
import MUICard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'

import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MUICard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent sx={{ p: 1.5, '&last-child': { p: 1.5 } }}>
          <Typography>DoKyAnh MERN STACK</Typography>
        </CardContent>
      </MUICard>
    )
  }
  return (
    <MUICard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://img.itch.zone/aW1nLzEyOTUzMzMwLnBuZw==/original/KISPyN.png"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&last-child': { p: 1.5 } }}>
        <Typography>DoKyAnh MERN STACK</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MUICard>
  )
}

export default Card

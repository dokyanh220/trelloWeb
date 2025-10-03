import { useLocation, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import trelloLeftBg from '~/assets/auth/trello-left.4f52d13c.svg'
import trelloRightBg from '~/assets/auth/trello-right.e6e102c7.svg'

function Auth() {
  const location = useLocation()
  // console.log(location)
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <Box sx={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgrounColor: 'rgb(250, 251, 252)',
      backgroundImage: `url("${trelloLeftBg}"), url("${trelloRightBg}")`,
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundAttachment: 'fixed, fixed',
      backgroundSize: '368px, 368px',
      backgroundPosition: 'left bottom, right bottom',
      width: '100%',
      height: '100%',
      zindex: '-1'
    }}>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Box>
  )
}

export default Auth
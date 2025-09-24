import { Routes, Route, Navigate } from 'react-router'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      {/* Replace giá trị true để thay thế route /, hiểu là route / sẽ không còn nẳm trong history browser */}
      <Route path='/' element={
        <Navigate to='/boards/68bb441840a03db8a35c25b4' replace={true} />
      } />

      <Route path='/boards/:boardId' element={<Board />}/>

      <Route path='/login' element={<Auth />}/>
      <Route path='/register' element={<Auth />}/>

      <Route path='/account/verification' element={<AccountVerification />}/>

      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App

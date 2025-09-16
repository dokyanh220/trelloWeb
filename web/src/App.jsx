import Board from '~/pages/Boards/_id'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from './pages/Auth/NotFound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Board />}/>

          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

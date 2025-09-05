import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fecthBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '68b9c30caa2c2bd9c9b74497'

    fecthBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: 'primary.main' }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board

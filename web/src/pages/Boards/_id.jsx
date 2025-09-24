import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { cloneDeep } from 'lodash'
import {
  fecthBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function Board() {
  const dispatch = useDispatch()
  // Sử dụng state của Redux
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    // Call Api
    dispatch(fecthBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
    /**
     * Trường hợp dùng spread operator này không lỗi vì ở đây chúng ta không dùng push như ở trên làm thay đổi trực tiếp kiểu mở rộng mảng,
     * mà chỉ dùng gọi lại toàn bộ giá trị columns và columnOrderIds bằng 2 mảng mới. Tương tự như cách làm concat ở trường hợp CreateNewColumn.
     */
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispatch(updateCurrentActiveBoard(newBoard))

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    /**
     * Cannot asign to read only property 'cards' of object - nested(Không thể gán thuộc tính 'cards' của đối tượng - lồng nhau)
     * Trường hợp Immutability ở đây đã đụng đến giá trị cards đang được coi là read only - (nested object - can thiệp sâu dữ liệu)
     */
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))


    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)
    // Tương tự moveColumn không ảnh hưởng đến Redux Toolkit Immutability
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispatch(updateCurrentActiveBoard(newBoard))


    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return <PageLoadingSpinner />
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}

        // Trường hợp kéo thả giữ nguyên để code xử lý kéo thả ở phần BoardContent không bị quá dài mất kiểm soát khi đọc code, maintain.
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board

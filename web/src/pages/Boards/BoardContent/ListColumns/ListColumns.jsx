import { useState } from 'react'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import Column from './Column/Column'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { createNewColumnApi } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { cloneDeep } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

function ListColumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => {
    setNewColumnTitle('')
    setOpenNewColumnForm(!openNewColumnForm)
  }

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.warn('Empty column title')
      return
    }
    const newColumnData = {
      title: newColumnTitle
    }

    // Gọi API tạo mới column và reset State Board
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhập state board
    // Phía front-end chúng ta phải tự làm đúng lại state data board(thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Lưu ý: cách làm phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa.
    // => Lúc này FE sẽ nhàn hơn

    /**
     * Đoạn này sẽ dính lỗi object is not extensible bởi dù đã coppy/clone ra giá trị NewBoard nhưng bản chất của spread operator là Shallow Copy/Clone,
     * nên dính phải rules Immutability trong Redux Toolkit không dùng được hàm PUSH (sửa giá trị mảng trực tiếp), cách đơn giản nhất ở trường hợp này của
     * chúng ta là dùng tới Deep Copy/Clone toàn bộ cái board cho dễ hiểu và code ngắn gọn.
     * https://redux-toolkit.js.org/usage/immer-reducers
     * Tài liệu thêm về Shallow và Deep Copy Object trong JS:
     * https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
     */
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    /**
     * Cách thứ 2 có thể dùng array.concat thay cho push như docs của Redux Toolkit ở trên vì push
     *  như đã nói nó sẽ thay đổi giá trị mảng trực tiếp, còn .concat sẽ merge - ghép mảng lại và tạo ra mảng mới để chúng ta gán lại giá trị nên không sao.
     */
    // const newBoard = { ...board }
    // newBoard.columns = newBoard.columns.concat([createdColumn])
    // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([createdColumn._id])

    // Cập nhập dữ liệu vào Redux Store
    dispatch(updateCurrentActiveBoard(newBoard))

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext
      items={columns?.map((item) => item._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'visible' // để BoardContent xử lý scroll
        }}
      >
        <Box
          sx={{
            bgcolor: 'inherit',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            // overflowX: 'auto',
            overflowY: 'hidden',
            width: 'max-content',
            height: '100%',
            '&::-webkit-scrollbar-track': { m: 0 }
          }}
        >
          {columns?.map((column) =>
            <Column key={column._id} column={column}
            />
          )}

          {!openNewColumnForm
            ? <Box onClick={toggleOpenNewColumnForm} sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}>
              <Button
                startIcon={<NoteAddIcon />}
                sx={{
                  color: 'white',
                  width: '100%',
                  justifyContent: 'flex-start',
                  pl: 2.5,
                  py: 1
                }}
              >
                Add new column
              </Button>
            </Box>
            : <Box sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <TextField
                label='Enter column title...'
                type="text"
                size="small"
                variant='outlined'
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                autoFocus
                sx={{
                  '& label': { color: 'white' },
                  '& input': { color: 'white' },
                  '& label.Mui-focused': { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  className='interceptor-loading'
                  onClick={addNewColumn}
                  variant='contained'
                  color='info'
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.info.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.info.dark }
                  }}
                >
                  Create Column
                </Button>
                <Button
                  onClick={toggleOpenNewColumnForm}
                  variant='contained'
                  color='error'
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.error.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.error.dark }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>}
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constanst'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'

// Khởi tạo giá trị State của một Slice trong redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi api(bất đồng bộ) và cập nhập dữ liệu vào Redux. dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const fecthBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fecthBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    // Axios sẽ trả về qua kết quả property của axios là data
    return response.data
  }
)

// Khởi tạo một Slice trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers nơi xử lý dữ liệu đồng bộ
  reducers: {
    // Lưu ý: Luôn luôn cần cặp ngoặc nhọn trong redux function dù code chỉ 1 dòng
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra một biến có nghĩa hơn
      const board = action.payload

      // Xử lý dữ liệu nếu cần thiết...

      // Update dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // ExtraReducer nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fecthBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload chính là respone.data trả về ở fecthBoardDetailsAPI
      let board = action.payload

      // sắp xếp thứ tự column trước khi gửi dữ liệu cho các components
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // sắp xếp thứ tự cards trước khi gửi dữ liệu cho components
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      // Update dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Actions là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhập lại dữ liệu thông qua reducer(chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bời vì những cái actions này đơn giản là được redux tạo tự động theo tên của reducer
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selector: là nơi dành cho các components bến dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store để sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// Cái file này tên là activeBoardSlice nhưng ta sẽ export một thứ có tên là reducer
export const activeBoardReducer = activeBoardSlice.reducer
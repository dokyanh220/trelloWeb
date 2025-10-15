import { createSlice } from '@reduxjs/toolkit'

// Khởi tạo giá trị State của một Slice trong redux
const initialState = {
  currentActiveCard: null
}

// Khởi tạo một Slice trong kho lưu trữ - Redux Store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers nơi xử lý dữ liệu đồng bộ
  reducers: {
    // Lưu ý: Luôn luôn cần cặp ngoặc nhọn trong redux function dù code chỉ 1 dòng
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },

    // Lưu ý: Luôn luôn cần cặp ngoặc nhọn trong redux function dù code chỉ 1 dòng
    updateCurrentActiveCard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra một biến có nghĩa hơn
      const fullCard = action.payload

      // Xử lý dữ liệu nếu cần thiết...

      // Update dữ liệu của currentActiveCard
      state.currentActiveCard = fullCard
    }
  },

  // ExtraReducer nơi xử lý dữ liệu bất đồng bộ
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {}
})

// Actions là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhập lại dữ liệu thông qua reducer(chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bời vì những cái actions này đơn giản là được redux tạo tự động theo tên của reducer
export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions

// Selector: là nơi dành cho các components bến dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store để sử dụng
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

// Cái file này tên là activeCardSlice nhưng ta sẽ export một thứ có tên là reducer
export const activeCardReducer = activeCardSlice.reducer
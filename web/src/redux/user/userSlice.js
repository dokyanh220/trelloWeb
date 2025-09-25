import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constanst'

// Khởi tạo giá trị State của một Slice trong redux
const initialState = {
  currentUser: null
}

// Các hành động gọi api(bất đồng bộ) và cập nhập dữ liệu vào Redux. dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    // Axios sẽ trả về qua kết quả property của axios là data
    return response.data
  }
)

// Khởi tạo một Slice trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // ExtraReducer nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload chính là respone.data trả về ở loginUserAPI
      const user = action.payload
      state.currentUser = user
    })
  }
})

// Actions là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhập lại dữ liệu thông qua reducer(chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bời vì những cái actions này đơn giản là được redux tạo tự động theo tên của reducer
// export const {} = userSlice.actions

// Selector: là nơi dành cho các components bến dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store để sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

// Cái file này tên là userSlice nhưng ta sẽ export một thứ có tên là reducer
export const userReducer = userSlice.reducer
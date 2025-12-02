import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constanst'

const initialState = {
  currentNotification: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const respone = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitation`)
    return respone.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationsAPI',
  async ({ notificationId, status }) => {
    const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitation/board/${notificationId}`, { status })
    return respone.data
  }
)

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotification = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotification = action.payload
    },
    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      // unshift là thêm phần từ vào đầu mằng, ngược lại với push
      state.currentNotification.unshift(incomingInvitation)
    }
  },
  extraReducers: (builder) => {
    builder. addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action. payload
      // Đoạn này đảo ngược lại mằng invitations nhận được, đơn giản là để hiển thị cái mới nhất lên đầu
      state.currentNotification = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    }),
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      // Cập nhật lại dữ liệu boardInvitation (bên trong nó sẽ có Status mới sau khi update)
      const getInvitation = state.currentNotification.find(i => i ._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationSlice.actions

export const selectCurrentNotification = (state) => {
  return state.notificationSlice.currentNotification
}

export const notificationReducer = notificationSlice.reducer
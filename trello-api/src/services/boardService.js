/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Gọi tới model để xử lý lưu bản ghi newBoard vào database
    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // Làm thêm xử lý logic khác với các Collection khác tùy đặc thù dự án...
    // Bắn email, notification cho admin khi có new board...

    // Trả về kết quả, trong Service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    // Deep clone tạo board hoàn toàn mới, không ảnh hưởng board cũ, tùy mục đích mà cần cloneDeep
    const resBoard = cloneDeep(board)
    // Đưa card vào column
    resBoard.columns.forEach(column => {
      // Cách dùng này vì MongoDB support method .equals
      // column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    // Xóa mảng card trong board ban đầu
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}


const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)

    return updatedBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails,
  update
}
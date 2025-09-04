/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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
    return createdBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}
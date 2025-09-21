import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { pickUser } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // Kiểm tra email xem đã tồn tại trong hệ thống
    const exitUser = await userModel.findOneByEmail(reqBody.email)
    if (exitUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exit!')
    }

    // Tạo data để lưu vào database
    // nameFromEmail: email là abcd@gmail.com lấy "abcd" bằng .split() tách chuỗi
    const nameFromEmail = reqBody.email.split('@')[0]
    const newUser = {
      email: reqBody.email,
      // Tham số thứ 2 là độ phức tạp, giá trị cao sẽ băm càng lâu
      password: bcryptjs.hashSync(reqBody.password, 8),
      username: nameFromEmail,
      // Mặc định để giống username khi user đăng ký mới, sẽ còn tính năng cập nhập displayName
      displayName: nameFromEmail,
      verifyToken: uuidv4()
    }
    // Thực hiện lưu newUser vào database
    const createdUser = await userModel.createNew(newUser)

    const getNewUser = await userModel.findOneById(createdUser.insertedId)
    // Gửi email xác thực tài khoản
    // Return Controller
    return pickUser(getNewUser)
  } catch (error) { throw error }
}

export const userService = {
  createNew
}
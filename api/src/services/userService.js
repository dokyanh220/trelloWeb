import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { pickUser } from '~/utils/formatters'
import { WEBSITE_DOMAIN } from '~/utils/constants'
import { BrevoProvider } from '~/providers/BrevoProvider'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'

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
    const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${getNewUser.email}&token=${getNewUser.verifyToken}`
    const customSubject = 'Trello web: Please verify your email before using our services!'
    const htmlContent = `
      <h3>Here is your verification link :</h3>
      <img src='https://img.thuthuattinhoc.vn/uploads/2019/03/07/thuthuattinhoc-slide-cam-on-dep-1_113240949.jpg' width="500"/>
      <h3>${verificationLink}</h3>
      <h3>Sincerely, <br/>- dokyanh-</h3>
    `
    await BrevoProvider.sendEmail(getNewUser.email, customSubject, htmlContent)

    // Return Controller
    return pickUser(getNewUser)
  } catch (error) { throw error }
}

const verifyAccount = async (reqBody) => {
  try {
    // Query user trong database
    const exitUser = await userModel.findOneByEmail(reqBody.email)

    // Các bước kiểm tra cần thiết
    if (!exitUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
    if (exitUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Account is already active!')
    if (reqBody.token !== exitUser.verifyToken) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Token is invalid!')

    // Kiểm tra xong active user, xóa đi verifyToken
    const updateData = {
      isActive: true,
      verifyToken: null
    }
    const updatedUser = await userModel.update(exitUser._id, updateData)

    return pickUser(updatedUser)
  } catch (error) { throw error }
}

const login = async (reqBody) => {
  try {
    // Query user trong database
    const exitUser = await userModel.findOneByEmail(reqBody.email)

    // Các bước kiểm tra cần thiết
    if (!exitUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
    if (!exitUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Account is not active, Please check email to active!')
    if (!bcryptjs.compareSync(reqBody.password, exitUser.password)) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your email or password is incorrect!')
    }

    /** Kiểm tra xong bắt đầu tạo token đăng nhập trả vế BE */
    // Thông tin đính kèm trong JWT bao gồm _id và email của user
    const userInfo = { _id: exitUser._id, email: exitUser.email }

    // Tạo ra 2 loại token để trả về BE
    const accessToken = await JwtProvider.genarateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
      // 5
    )

    const refreshToken = await JwtProvider.genarateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      env.REFRESH_TOKEN_LIFE
      // 15
    )

    // Trả về thông tin user kèm 2 token vừa tạo
    return { accessToken, refreshToken, ...pickUser(exitUser) }
  } catch (error) { throw error }
}

const refreshToken = async (clientRefreshToken) => {
  try {
    // Giải mã token có hợp lệ không
    const refreshTokenDecoded = await JwtProvider.verifyToken(clientRefreshToken, env.REFRESH_TOKEN_SECRET_SIGNATURE)

    // Thay vì lưu thông tin user và cố định trong token, có thể lấy từ decoded để tiết kiệm query vào DB lấy data mới
    const userInfo = { _id: refreshTokenDecoded._id, email: refreshTokenDecoded.email }

    // Tạo ra 2 loại token để trả về BE
    const accessToken = await JwtProvider.genarateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
      // 5
    )
    return { accessToken }
  } catch (error) { throw error }
}

const update = async (userId, reqBody) => {
  try {
     // Query user trong database
    const exitUser = await userModel.findOneById(userId)
    if (!exitUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
    if (!exitUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Account is not active!')

    // khởi tạo user updated ban đầu = empty
    let updatedUser = {}

    if (reqBody.current_password && reqBody.new_password) {
      // Kiểm tra current_password
      if (!bcryptjs.compareSync(reqBody.current_password, exitUser.password)) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your current password is incorrect!')
      }

      // Nếu passed current_password, hash new password and update database
      updatedUser = await userModel.update(userId, {
        password: bcryptjs.hashSync(reqBody.new_password, 8)
      })
    }
    else {
      // Trường hợp update thông tin chung, vd: displayName
      updatedUser = await userModel.update(exitUser._id, reqBody)
    }

    return pickUser(updatedUser)
  } catch (error) { throw error }
}

export const userService = {
  createNew,
  verifyAccount,
  login,
  refreshToken,
  update
}
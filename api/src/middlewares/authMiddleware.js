import { StatusCodes } from 'http-status-codes'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'

// Middleware sẽ đảm nhiệm việc quan trọng: Xác thực JWT accessToken nhận được từ FE hợp lệ hay không
const isAuthorized = async (req, res, next) => {
  // Lấy accessToken trong req cookies từ clien - withCredentials trong file authorizeAxios
  const clientAccessToken = req.cookies?.accessToken

  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorize! (Token not found)'))
    return
  }

  try {
    // Bước 1: Thực hiện giải mã Token xem có hợp lệ không
    const accessTokenDecoded = await JwtProvider.verifyToken(clientAccessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE)

    // Bước 2: Token hợp lệ, cần phải lưu thông tin giải mã được vào cái req, jwtDecoded, để sử dụng cho các tầng xử lý ở phía sau
    req.jwtDecoded = accessTokenDecoded

    // Bước 3: Cho phép req đi tiếp
    next()
  } catch (error) {
    // AccessToken hết hạn (expired), cần trả về mã lỗi cho FE biết để gọi api refreshToken
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token.'))
      return
    }

    // AccessToken không hợp lệ, trả về mã 401 cho FE gọi api logout
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorize!'))
  }

}

export const authMiddleware = {
  isAuthorized
}
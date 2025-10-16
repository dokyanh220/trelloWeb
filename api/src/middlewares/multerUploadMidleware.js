import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import ApiError from '~/utils/ApiError'
import { ALLOW_COMMON_FILE_TYPES, LIMIT_COMMON_FILE_SIZE } from '~/utils/validators'

// Kiểm tra loại file được chấp nhận
const customFileFilter = (req, file, cb) => {
  // console.log('🚀 ~ customFileFilter ~ file:', file)

  // Đối với multer kiểm tra kiểu file sử dụng mimetype
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    const errorMessage = 'File type is invalid. Only accept jpg, jpeg and png'
    return cb(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage), null)
  }

  // Nếu như file hợp lệ
  return cb(null, true)
}

// Khởi tạo func upload được bọc bởi multer
const upload = multer({
  limits: { fileSize: LIMIT_COMMON_FILE_SIZE },
  fileFilter: customFileFilter
})

export const multerUploadMidleware = { upload }
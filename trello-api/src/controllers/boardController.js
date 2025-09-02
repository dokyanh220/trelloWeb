import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    // Có kết quả trả về phía client
    res.status(StatusCodes.CREATED).json({ message: 'Post from controller: create new board' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
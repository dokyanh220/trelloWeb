import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardModel } from '~/models/boardModel'
import { invitationModel } from '~/models/invitationModel'
import { INVITATION_TYPES, BOARD_INVITATION_STATUS } from '~/utils/constants'
import { pickUser } from '~/utils/formatters'
import { userModel } from '~/models/userModel'

const createNewBoardInvitation = async (reqBody, inviterId) => {
  try {
    // Người đi mời: chính là người đang request, nên chúng ta tìm theo id lấy từ token
    const inviter = await userModel.findOneById(inviterId)
    // Người được mời: lẩy theo email nhận từ phía FE
    const invitee = await userModel.findOneByEmail(reqBody.inviteeEmail)
    // Tìm board ra để lẩy data xử lý
    const board = await boardModel.findOneById(reqBody.boardId)

    // Nếu không tồn tại 1 trong 3 thì cứ thắng tay reject
    if (!invitee || !inviter || !board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Inviter, Invitee or Board not found!')
    }

    // Tạo data cần thiết đề lưu vào trong DB
    // Có thể thử bỏ hoặc làm sai lệch type, boardInvitation, status đe test xem Model validate ok chưa.
    const newInvitationData = {
      inviterId,
      inviteeId: invitee._id.toString(), // chuyển từ ObjectId về String vì sang bên Model có check lại data ở hàm create
      type: INVITATION_TYPES.BOARD_INVITATION,
      boardInvitation: {
        boardId: board._id.toString(),
        status: BOARD_INVITATION_STATUS.PENDING
      }
    }

    // Gọi sang Model để lưu vào DB
    const createdInvitation = await invitationModel.createNewBoardInvitation(newInvitationData)
    const getInvitation = await invitationModel.findOneById(createdInvitation.insertedId.toString())

    // Ngoài thông tin của cái board invitation mới tạo thì trả về đủ cả luôn board, inviter, invitee cho FE thoải mái xử lý.
    const resInvitation = {
      ... getInvitation,
      board,
      inviter: pickUser(inviter),
      invitee: pickUser(invitee)
    }
    return resInvitation
  } catch (error) {
    // console.log('🚀 ~ createNewBoardInvitation ~ error:', error)
    throw error }
}

const getInvitations = async (userId) => {
  try {
    const getInvitations = await invitationModel.findByUser(userId)
  } catch (error) { throw error }
}

const updateBoardInvitation = async (userId, invitationId, status) => {
  try {
    const getInvitations = await invitationModel.findOneById(invitationId)
    if (!getInvitations) throw new ApiError(StatusCodes.NOT_FOUND, 'Invitation not found')

    const boardId = getInvitations.boardInvitation.boardId
    const getBoard = await boardModel.findOneById(boardId)
    if (!getBoard) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')

    const boardOwnerAndMember = [...getBoard.ownerIds, ...getBoard.memberIds].toString() // hoặc sử dụng concat, quên r :))
    if (status == BOARD_INVITATION_STATUS.ACCEPTED && boardOwnerAndMember.includes(userId)) {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'You are already member of this board')
    }

    if (status === BOARD_INVITATION_STATUS.REJECTED) {
      await invitationModel.delete(invitationId)
      return { message: 'Invitation deleted because rejected' }
    }

    const updateData = {
      boardInvitation: {
        ...getInvitations.boardInvitation,
        status: status // tham số đầu vào
      }
    }

    const updatedInvitation = await invitationModel.update(invitationId, updateData)

    if (updatedInvitation.boardInvitation.status == BOARD_INVITATION_STATUS.ACCEPTED) {
      await boardModel.pushMember(boardId, userId)
    }

    return updatedInvitation
  } catch (error) { throw error }
}

export const invitationService = {
  createNewBoardInvitation,
  getInvitations,
  updateBoardInvitation
}
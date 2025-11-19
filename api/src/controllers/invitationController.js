import { StatusCodes } from 'http-status-codes'
import { invitationService } from '~/services/invitationService'

const createNewBoardInvitation = async (req, res, next) => {
  try {
    console.log('[INVITE] req.body:', req.body)
    // Người mời
    const inviterId = req.jwtDecoded._id
    // Người được mời
    const resInvitation = await invitationService.createNewBoardInvitation(req.body, inviterId)

    res.status(StatusCodes.CREATED).json(resInvitation)
  } catch (error) {
    next(error) }
}

export const invitationController = {
  createNewBoardInvitation
}
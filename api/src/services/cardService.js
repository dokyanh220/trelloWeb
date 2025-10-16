import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import { CloudinaryProvider } from '~/providers/CloudinaryProvider'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }
    const createdCard = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) { throw error }
}

const update = async (cardId, reqBody, cardCoverFile) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    let updatedCard = {}

    if (cardCoverFile) {
      // Trường hợp nhận được avatarFile
      // Lấy thông tin card hiện tại để xóa cover cũ
      const currentCard = await cardModel.findOneById(cardId)

      // Xóa cover cũ nếu có
      if (currentCard?.cover) {
        try {
          const oldPublicId = CloudinaryProvider.getPublicIdFromUrl(currentCard.cover)
          if (oldPublicId) {
            await CloudinaryProvider.destroyMedia(oldPublicId)
            // console.log('🗑️ Deleted old cover:', oldPublicId)
          }
        } catch (error) {
          console.warn('⚠️ Could not delete old cover:', error.message)
        }
      }

      const uploadResult = await CloudinaryProvider.streamUpload(cardCoverFile.buffer, 'card_covers')
      // console.log('🚀 ~ update ~ uploadResult:', uploadResult)

      // Lưu lại secure_url(đường dẫn bảo mật) của file ảnh vào database
      updatedCard = await cardModel.update(cardId, {
        cover: uploadResult.secure_url
      })
    } else {
      updatedCard = await cardModel.update(cardId, updateData)
    }

    return updatedCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew,
  update
}
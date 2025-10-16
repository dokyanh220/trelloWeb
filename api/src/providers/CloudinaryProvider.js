import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import { env } from '~/config/environment'

const cloudinaryV2 = cloudinary.v2
cloudinaryV2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
})

// Khởi tạo func upload file to cloudinary
const streamUpload = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
  // Tạo một cái luồng stream upload lên cloudinary
    const stream = cloudinaryV2.uploader.upload_stream({ folder: folderName }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
    // Thực hiện upload cái luồng trên bằng lib streamifier
    streamifier.createReadStream(fileBuffer).pipe(stream)
  })
}

const destroyMedia = async (publicId) => {
  try {
    // console.log('🗑️ Attempting to delete:', publicId)
    const result = await cloudinary.uploader.destroy(publicId)
    // console.log('🗑️ Delete result:', result)
    return result
  } catch (error) {
    console.error('❌ Error deleting media:', error)
    throw new Error(error.message)
  }
}

const getPublicIdFromUrl = (imageUrl) => {
  try {
    if (!imageUrl) return null
    
    // console.log('🔍 Processing URL:', imageUrl)

    // URL example: https://res.cloudinary.com/dokyanh220/image/upload/v1760634660/users/vomhzfnnty1rnbgb3fi4.jpg
    const urlParts = imageUrl.split('/')
    // → ['https:', '', 'res.cloudinary.com', 'dokyanh220', 'image', 'upload', 'v1760634660', 'users', 'vomhzfnnty1rnbgb3fi4.jpg']

    const uploadIndex = urlParts.findIndex(part => part === 'upload')
    // → uploadIndex = 5

    const pathAfterUpload = urlParts.slice(uploadIndex + 1)
    // → ['v1760634660', 'users', 'vomhzfnnty1rnbgb3fi4.jpg']

    const pathWithoutVersion = pathAfterUpload.filter(part => !part.startsWith('v'))
    // → ['users', 'vomhzfnnty1rnbgb3fi4.jpg'] (bỏ 'v1760634660')

    const publicIdWithExtension = pathWithoutVersion.join('/')
    // → 'users/vomhzfnnty1rnbgb3fi4.jpg'

    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '')
    // → 'users/vomhzfnnty1rnbgb3fi4' (bỏ '.jpg')
      
    // console.log('🔍 Extracted publicId:', publicId)
    return publicId
  } catch (error) {
    console.error('❌ Error extracting publicId:', error)
    return null
  }
}

export const CloudinaryProvider = {
  streamUpload,
  getPublicIdFromUrl,
  destroyMedia
}
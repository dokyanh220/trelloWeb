import { env } from './environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance = null

// Khởi tạo một đối tượng để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới mongoDB atlas với URI đã khai báo trong thân mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra Database và gán ngược lại biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// Func GET_DB không async có nhiệm vụ export ra trello databse instance
// sau khi connect thành công tới mongoDB để sử dụng nhiều nơi
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

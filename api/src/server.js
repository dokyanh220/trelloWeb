/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errolHandllingMiddleware'
import cookieParser from 'cookie-parser'

const START_SERVER = () => {
  const app = express()

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  app.use(cookieParser())

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Back-end Server running successfully at ${env.PORT }`)
    })
  } else {
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Back-end Server running successfully at http://${env.APP_HOST}:${env.APP_PORT}/`)
    })
  }

  // Cleanup trước khi dừng server
  exitHook(() => {
    console.log('Disconnected from MongoDB Cloud Atlas!')
    CLOSE_DB()
  })
}

console.log('Connecting to MongoDB Cloud Atlas...')
CONNECT_DB()
  .then(() => { console.log('Connected to MongoDB Cloud Atlas!') })
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })
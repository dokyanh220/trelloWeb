/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from './config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Back-end Server running successfully at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

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
import app from './setup'
import http from 'http'

const server = http.createServer(app)

server
  .listen(process.env.PORT, () =>
    console.info(`Server ready at port ${process.env.PORT}`)
  )
  .on('error', err => console.error(err))

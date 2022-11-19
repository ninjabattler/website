const express = require('express')
const next = require('next')
const server = express()

server.listen(4000, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:4000`)
})

const app = next.default({
  dev: false,
  dir: "./",
  conf: {
    reactStrictMode: false,
    images: {
      domains: ['files.ninjabattler.ca', 'storage.googleapis.com'],
    }
  },
  port: 4000,
  httpServer: server
})
const handle = app.getRequestHandler()

app.prepare()
.then(() => {

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

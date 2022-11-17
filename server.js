const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV === 'production'
const app = next({
  dev: false,
  dir: "./",
  conf: {
    reactStrictMode: true,
    images: {
      domains: ['files.ninjabattler.ca', 'storage.googleapis.com'],
    }
  },
  
})
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  console.log(handle)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(80, (err) => {
    console.log(err)
    if (err) throw err
    console.log('> Ready on http://localhost:4000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

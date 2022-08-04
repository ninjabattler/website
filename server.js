const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
// const test = require('./.next/build-manifest.json')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev: false,
  dir: "./",
  conf: {
    reactStrictMode: true,
    images: {
      domains: ['files.ninjabattler.ca', 'storage.googleapis.com'],
    }
  }
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  // console.log(test)
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(4000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:4000')
  })
})
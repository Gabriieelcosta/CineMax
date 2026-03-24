require('dotenv').config()

const serverless = require('serverless-http')
const { buildApp } = require('./server')

let cachedHandler

async function getHandler() {
  if (!cachedHandler) {
    const app = await buildApp()
    await app.ready()
    cachedHandler = serverless(app)
  }
  return cachedHandler
}

module.exports.handler = async (event, context) => {
  const handler = await getHandler()
  return handler(event, context)
}

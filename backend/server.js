require('dotenv').config()

const fastify = require('fastify')({ logger: true })
const { swaggerConfig, swaggerUiConfig } = require('./src/config/swagger')
const jwtConfig = require('./src/config/jwt')
const { errorHandler } = require('./src/middlewares/errorHandler')
const registerRoutes = require('./src/routes')

async function buildApp() {
  // Documentação OpenAPI (Swagger)
  await fastify.register(require('@fastify/swagger'), swaggerConfig)
  await fastify.register(require('@fastify/swagger-ui'), swaggerUiConfig)

  // CORS — permite o frontend chamar a API
  // Suporta múltiplas origens separadas por vírgula (ex: dev local + Docker)
  const corsOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((o) => o.trim())
  await fastify.register(require('@fastify/cors'), {
    origin: corsOrigins.length === 1 ? corsOrigins[0] : corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })

  // JWT — autenticação
  await fastify.register(require('@fastify/jwt'), jwtConfig)

  // Tratamento centralizado de erros
  fastify.setErrorHandler(errorHandler)

  // Rotas
  await registerRoutes(fastify)

  return fastify
}

async function start() {
  try {
    const app = await buildApp()
    const port = Number(process.env.PORT) || 3000

    await app.listen({ port, host: '0.0.0.0' })
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log(`Documentação disponível em http://localhost:${port}/docs`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// Exporta buildApp para o handler.js (AWS Lambda)
module.exports = { buildApp }

// Inicia o servidor apenas quando executado diretamente (não pelo Lambda)
if (require.main === module) {
  start()
}

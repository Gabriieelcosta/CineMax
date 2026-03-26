const { register, login } = require('../controllers/authController')

async function authRoutes(fastify) {
  fastify.post('/auth/register', {
    schema: {
      tags: ['Auth'],
      summary: 'Cadastrar novo usuário',
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 2 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
      response: {
        201: {
          description: 'Usuario cadastrado com sucesso',
          type: 'object',
          properties: {
            token: { type: 'string', description: 'Token JWT' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
              },
            },
          },
        },
        400: { description: 'Dados invalidos ou e-mail ja cadastrado' },
      },
    },
  }, register)

  fastify.post('/auth/login', {
    schema: {
      tags: ['Auth'],
      summary: 'Realizar login',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Login realizado com sucesso',
          type: 'object',
          properties: {
            token: { type: 'string', description: 'Token JWT' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
              },
            },
          },
        },
        401: { description: 'Credenciais invalidas' },
      },
    },
  }, login)
}

module.exports = authRoutes

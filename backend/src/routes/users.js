const { getProfile, updateProfile, getAll } = require('../controllers/userController')
const { authenticate } = require('../middlewares/auth')

async function userRoutes(fastify) {
  fastify.get('/users/me', {
    preHandler: authenticate,
    schema: {
      tags: ['Users'],
      summary: 'Obter perfil do usuário autenticado',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          description: 'Perfil do usuario',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, getProfile)

  fastify.get('/users', {
    preHandler: authenticate,
    schema: {
      tags: ['Users'],
      summary: 'Listar todos os usuários',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          description: 'Lista de usuarios do sistema',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, getAll)

  fastify.put('/users/me', {
    preHandler: authenticate,
    schema: {
      tags: ['Users'],
      summary: 'Atualizar perfil do usuário',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 2 },
          password: { type: 'string', minLength: 6 },
        },
      },
      response: {
        200: {
          description: 'Perfil atualizado com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, updateProfile)
}

module.exports = userRoutes

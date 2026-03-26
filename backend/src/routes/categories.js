const { getAll, create, update, remove } = require('../controllers/categoryController')
const { authenticate } = require('../middlewares/auth')

async function categoryRoutes(fastify) {
  fastify.get('/categories', {
    preHandler: authenticate,
    schema: {
      tags: ['Categories'],
      summary: 'Listar categorias do usuário',
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          description: 'Lista de categorias',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              color: { type: 'string' },
            },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, getAll)

  fastify.post('/categories', {
    preHandler: authenticate,
    schema: {
      tags: ['Categories'],
      summary: 'Criar nova categoria',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', minLength: 1 },
          color: { type: 'string', default: '#6366f1' },
        },
      },
      response: {
        201: {
          description: 'Categoria criada com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            color: { type: 'string' },
          },
        },
        401: { description: 'Nao autorizado' },
      },
    },
  }, create)

  fastify.put('/categories/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Categories'],
      summary: 'Atualizar categoria',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } },
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          color: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Categoria atualizada com sucesso',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            color: { type: 'string' },
          },
        },
        401: { description: 'Nao autorizado' },
        403: { description: 'Somente o criador pode editar' },
        404: { description: 'Categoria nao encontrada' },
      },
    },
  }, update)

  fastify.delete('/categories/:id', {
    preHandler: authenticate,
    schema: {
      tags: ['Categories'],
      summary: 'Deletar categoria',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } },
      },
      response: {
        204: { description: 'Categoria excluida com sucesso' },
        401: { description: 'Nao autorizado' },
        403: { description: 'Somente o criador pode excluir' },
        404: { description: 'Categoria nao encontrada' },
      },
    },
  }, remove)
}

module.exports = categoryRoutes
